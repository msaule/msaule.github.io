-- ==========================================================
-- Hospital Readmission Database (Diabetes 130-US Hospitals)
-- Author: Markuss Saule
-- ==========================================================
-- Purpose:
--   Normalized schema + pipeline for loading and analyzing
--   ~100k encounters from the Diabetes 130-US Hospitals dataset.
-- Steps:
--   0) Create database
--   1) Reference (code) tables
--   2) Core entity tables
--   3) Staging table (mirror CSV)
--   4) ETL inserts into normalized schema
--   5) Basic validation queries
--   6) Analysis view
-- ==========================================================


-- 0) Create database
CREATE DATABASE IF NOT EXISTS diabetes_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE diabetes_db;


-- ==========================================================
-- 1) Reference (code) tables
-- ==========================================================
CREATE TABLE code_race (
  race_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code    VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE code_gender (
  gender_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code      VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE code_age_group (
  age_group_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  label        VARCHAR(20) NOT NULL UNIQUE,
  lower_bound  TINYINT NULL,
  upper_bound  TINYINT NULL
);

CREATE TABLE code_admission_type (
  admission_type_id TINYINT UNSIGNED PRIMARY KEY,
  name              VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE code_discharge_disposition (
  discharge_disposition_id SMALLINT UNSIGNED PRIMARY KEY,
  name                     VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE code_admission_source (
  admission_source_id SMALLINT UNSIGNED PRIMARY KEY,
  name                VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE code_readmitted (
  readmitted_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code          VARCHAR(10) NOT NULL UNIQUE  -- '<30', '>30', 'NO'
);

CREATE TABLE code_a1c_result (
  a1c_result_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code          VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE code_max_glu_serum (
  max_glu_serum_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code             VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE medical_specialty (
  medical_specialty_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name                 VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE medication (
  medication_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name          VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE code_med_status (
  med_status_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code          VARCHAR(10) NOT NULL UNIQUE   -- 'No', 'Steady', 'Up', 'Down'
);


-- ==========================================================
-- 2) Core entity tables
-- ==========================================================
CREATE TABLE patient (
  patient_id   BIGINT PRIMARY KEY,          -- from CSV patient_nbr
  race_id      TINYINT UNSIGNED NULL,
  gender_id    TINYINT UNSIGNED NULL,
  age_group_id TINYINT UNSIGNED NULL,
  payer_code   VARCHAR(20) NULL,
  weight_text  VARCHAR(20) NULL,
  CONSTRAINT fk_patient_race    FOREIGN KEY (race_id) REFERENCES code_race(race_id),
  CONSTRAINT fk_patient_gender  FOREIGN KEY (gender_id) REFERENCES code_gender(gender_id),
  CONSTRAINT fk_patient_agegrp  FOREIGN KEY (age_group_id) REFERENCES code_age_group(age_group_id)
);

CREATE TABLE encounter (
  encounter_id             BIGINT PRIMARY KEY, -- from CSV
  patient_id               BIGINT NOT NULL,
  admission_type_id        TINYINT UNSIGNED NULL,
  discharge_disposition_id SMALLINT UNSIGNED NULL,
  admission_source_id      SMALLINT UNSIGNED NULL,
  time_in_hospital         TINYINT UNSIGNED NULL,
  num_lab_procedures       SMALLINT UNSIGNED NULL,
  num_procedures           SMALLINT UNSIGNED NULL,
  num_medications          SMALLINT UNSIGNED NULL,
  number_outpatient        SMALLINT UNSIGNED NULL,
  number_emergency         SMALLINT UNSIGNED NULL,
  number_inpatient         SMALLINT UNSIGNED NULL,
  number_diagnoses         TINYINT UNSIGNED NULL,
  medical_specialty_id     SMALLINT UNSIGNED NULL,
  readmitted_id            TINYINT UNSIGNED NULL,
  a1c_result_id            TINYINT UNSIGNED NULL,
  max_glu_serum_id         TINYINT UNSIGNED NULL,
  change_flag              BOOLEAN NULL,    -- 'Ch'->true, 'No'->false
  diabetes_med_flag        BOOLEAN NULL,    -- 'Yes'/'No'
  CONSTRAINT fk_enc_patient     FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
  CONSTRAINT fk_enc_admtype     FOREIGN KEY (admission_type_id) REFERENCES code_admission_type(admission_type_id),
  CONSTRAINT fk_enc_disposition FOREIGN KEY (discharge_disposition_id) REFERENCES code_discharge_disposition(discharge_disposition_id),
  CONSTRAINT fk_enc_admsource   FOREIGN KEY (admission_source_id) REFERENCES code_admission_source(admission_source_id),
  CONSTRAINT fk_enc_med_spec    FOREIGN KEY (medical_specialty_id) REFERENCES medical_specialty(medical_specialty_id),
  CONSTRAINT fk_enc_readmitted  FOREIGN KEY (readmitted_id) REFERENCES code_readmitted(readmitted_id),
  CONSTRAINT fk_enc_a1c         FOREIGN KEY (a1c_result_id) REFERENCES code_a1c_result(a1c_result_id),
  CONSTRAINT fk_enc_maxglu      FOREIGN KEY (max_glu_serum_id) REFERENCES code_max_glu_serum(max_glu_serum_id)
);

CREATE TABLE encounter_diagnosis (
  encounter_id BIGINT NOT NULL,
  position_no  TINYINT UNSIGNED NOT NULL,  -- 1,2,3
  icd9_code    VARCHAR(10) NOT NULL,
  PRIMARY KEY (encounter_id, position_no),
  CONSTRAINT fk_ed_enc FOREIGN KEY (encounter_id) REFERENCES encounter(encounter_id)
);

CREATE TABLE encounter_medication (
  encounter_id  BIGINT NOT NULL,
  medication_id SMALLINT UNSIGNED NOT NULL,
  med_status_id TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (encounter_id, medication_id),
  CONSTRAINT fk_em_enc    FOREIGN KEY (encounter_id)  REFERENCES encounter(encounter_id),
  CONSTRAINT fk_em_med    FOREIGN KEY (medication_id) REFERENCES medication(medication_id),
  CONSTRAINT fk_em_status FOREIGN KEY (med_status_id) REFERENCES code_med_status(med_status_id)
);


-- ==========================================================
-- 3) Staging table (mirror CSV for import)
-- ==========================================================
DROP TABLE IF EXISTS staging_encounter_raw;
CREATE TABLE staging_encounter_raw (
  encounter_id    BIGINT,
  patient_nbr     BIGINT,
  race            VARCHAR(50),
  gender          VARCHAR(20),
  age             VARCHAR(20),
  weight          VARCHAR(20),
  admission_type_id INT,
  discharge_disposition_id INT,
  admission_source_id INT,
  time_in_hospital INT,
  payer_code      VARCHAR(20),
  medical_specialty VARCHAR(150),
  num_lab_procedures INT,
  num_procedures  INT,
  num_medications INT,
  number_outpatient INT,
  number_emergency INT,
  number_inpatient INT,
  diag_1          VARCHAR(10),
  diag_2          VARCHAR(10),
  diag_3          VARCHAR(10),
  number_diagnoses INT,
  max_glu_serum   VARCHAR(10),
  A1Cresult       VARCHAR(10),
  metformin       VARCHAR(10),
  repaglinide     VARCHAR(10),
  nateglinide     VARCHAR(10),
  chlorpropamide  VARCHAR(10),
  glimepiride     VARCHAR(10),
  acetohexamide   VARCHAR(10),
  glipizide       VARCHAR(10),
  glyburide       VARCHAR(10),
  tolbutamide     VARCHAR(10),
  pioglitazone    VARCHAR(10),
  rosiglitazone   VARCHAR(10),
  acarbose        VARCHAR(10),
  miglitol        VARCHAR(10),
  troglitazone    VARCHAR(10),
  tolazamide      VARCHAR(10),
  examide         VARCHAR(10),
  citoglipton     VARCHAR(10),
  insulin         VARCHAR(10),
  glyburide_metformin VARCHAR(10),
  glipizide_metformin VARCHAR(10),
  glimepiride_pioglitazone VARCHAR(10),
  metformin_rosiglitazone VARCHAR(10),
  metformin_pioglitazone VARCHAR(10),
  change_raw      VARCHAR(10),
  diabetesMed     VARCHAR(10),
  readmitted      VARCHAR(10)
);


-- ==========================================================
-- 4) ETL Inserts
-- ==========================================================

-- Populate reference/code tables
INSERT IGNORE INTO code_race (code)              SELECT DISTINCT race FROM staging_encounter_raw;
INSERT IGNORE INTO code_gender (code)            SELECT DISTINCT gender FROM staging_encounter_raw;
INSERT IGNORE INTO code_age_group (label)        SELECT DISTINCT age FROM staging_encounter_raw;
INSERT IGNORE INTO code_readmitted (code)        SELECT DISTINCT readmitted FROM staging_encounter_raw;
INSERT IGNORE INTO code_a1c_result (code)        SELECT DISTINCT A1Cresult FROM staging_encounter_raw;
INSERT IGNORE INTO code_max_glu_serum (code)     SELECT DISTINCT max_glu_serum FROM staging_encounter_raw;
INSERT IGNORE INTO medical_specialty (name)      
  SELECT DISTINCT medical_specialty FROM staging_encounter_raw WHERE medical_specialty <> '?';

INSERT IGNORE INTO code_admission_type (admission_type_id, name)
  SELECT DISTINCT admission_type_id, CONCAT('Type ', admission_type_id)
  FROM staging_encounter_raw WHERE admission_type_id IS NOT NULL;

INSERT IGNORE INTO code_discharge_disposition (discharge_disposition_id, name)
  SELECT DISTINCT discharge_disposition_id, CONCAT('Disposition ', discharge_disposition_id)
  FROM staging_encounter_raw WHERE discharge_disposition_id IS NOT NULL;

INSERT IGNORE INTO code_admission_source (admission_source_id, name)
  SELECT DISTINCT admission_source_id, CONCAT('Source ', admission_source_id)
  FROM staging_encounter_raw WHERE admission_source_id IS NOT NULL;


-- Patients
INSERT INTO patient (patient_id, race_id, gender_id, age_group_id, payer_code, weight_text)
SELECT
  s.patient_nbr,
  r.race_id,
  g.gender_id,
  a.age_group_id,
  NULLIF(s.payer_code, '?'),
  NULLIF(s.weight, '?')
FROM (
  SELECT s1.*
  FROM staging_encounter_raw s1
  JOIN (
    SELECT patient_nbr, MIN(encounter_id) AS min_enc
    FROM staging_encounter_raw
    GROUP BY patient_nbr
  ) t ON s1.patient_nbr = t.patient_nbr AND s1.encounter_id = t.min_enc
) s
LEFT JOIN code_race r ON r.code = s.race
LEFT JOIN code_gender g ON g.code = s.gender
LEFT JOIN code_age_group a ON a.label = s.age;

-- Encounters
INSERT INTO encounter (
  encounter_id, patient_id, admission_type_id, discharge_disposition_id, admission_source_id,
  time_in_hospital, num_lab_procedures, num_procedures, num_medications,
  number_outpatient, number_emergency, number_inpatient, number_diagnoses,
  medical_specialty_id, readmitted_id, a1c_result_id, max_glu_serum_id,
  change_flag, diabetes_med_flag
)
SELECT
  s.encounter_id,
  s.patient_nbr,
  s.admission_type_id,
  s.discharge_disposition_id,
  s.admission_source_id,
  s.time_in_hospital,
  s.num_lab_procedures,
  s.num_procedures,
  s.num_medications,
  s.number_outpatient,
  s.number_emergency,
  s.number_inpatient,
  s.number_diagnoses,
  ms.medical_specialty_id,
  cr.readmitted_id,
  ca.a1c_result_id,
  cg.max_glu_serum_id,
  CASE WHEN s.change_raw = 'Ch' THEN TRUE WHEN s.change_raw = 'No' THEN FALSE ELSE NULL END,
  CASE WHEN s.diabetesMed = 'Yes' THEN TRUE WHEN s.diabetesMed = 'No' THEN FALSE ELSE NULL END
FROM staging_encounter_raw s
LEFT JOIN medical_specialty ms ON ms.name = s.medical_specialty
LEFT JOIN code_readmitted cr   ON cr.code = s.readmitted
LEFT JOIN code_a1c_result ca   ON ca.code = s.A1Cresult
LEFT JOIN code_max_glu_serum cg ON cg.code = s.max_glu_serum;


-- ==========================================================
-- 5) Validation queries
-- ==========================================================
SELECT COUNT(*) AS n_patients FROM patient;
SELECT COUNT(*) AS n_encounters FROM encounter;

SELECT cr.code AS readmitted, COUNT(*) AS n
FROM encounter e
JOIN code_readmitted cr ON cr.readmitted_id = e.readmitted_id
GROUP BY cr.code;


-- ==========================================================
-- 6) Analysis view
-- ==========================================================
CREATE OR REPLACE VIEW vw_encounter_patient AS
SELECT 
  e.encounter_id,
  p.patient_id,
  r.code AS race,
  g.code AS gender,
  a.label AS age_group,
  e.time_in_hospital,
  e.num_medications,
  e.number_diagnoses,
  cr.code AS readmitted
FROM encounter e
JOIN patient p              ON p.patient_id = e.patient_id
LEFT JOIN code_race r       ON r.race_id = p.race_id
LEFT JOIN code_gender g     ON g.gender_id = p.gender_id
LEFT JOIN code_age_group a  ON a.age_group_id = p.age_group_id
LEFT JOIN code_readmitted cr ON cr.readmitted_id = e.readmitted_id;