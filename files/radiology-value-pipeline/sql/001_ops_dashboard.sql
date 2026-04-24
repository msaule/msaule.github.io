CREATE OR REPLACE VIEW ops_dashboard_metrics AS
SELECT
    d.event_date,
    d.metric_name,
    d.metric_value::double precision AS metric_value,
    'ops'::text AS metric_group,
    s.code AS site_code
FROM dashboard_fact_daily d
JOIN sites s ON s.id = d.site_id
WHERE d.metric_group = 'ops';
