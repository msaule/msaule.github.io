# MERCURY

Multi-Agent Exchange for Research, Competition, Understanding, and Yield.

MERCURY is a research-oriented market microstructure simulator built around a continuous double-auction limit order book. It models endogenous price formation, heterogeneous trading agents, liquidity shocks, and flash-crash dynamics.

## Features

- Continuous double auction with price-time priority
- Limit, market, iceberg, pegged, cancel, modify/replace, and partial reduction order handling
- Single-asset and correlated two-asset simulation modes
- Agent classes for noise flow, market making, momentum, fair-value arbitrage, pairs arbitrage, and execution
- Institutional rebalancer agent for cross-asset allocation flow and spillover experiments
- Cross-venue arbitrage agent for fragmented-market and best-execution experiments
- Advanced latency-arbitrage agent for stale-quote and impact-reversal experiments
- Panic-seller agent for endogenous liquidation cascades under stress
- Spoofing agent for layered quote-pressure and cancellation-heavy manipulation experiments
- Stop-loss agent for dormant stop-market orders and cascade experiments
- Advanced execution algo agent for scheduled liquidation or accumulation
- Iceberg order support with visible-depth accounting and replenishment analytics
- Pegged order support with live book-following repricing and peg-update analytics
- Maker-taker fee modeling with fee-aware trade logs, agent cashflows, and venue-economics analysis
- Agent-specific order latency with delayed order-arrival events
- Latent fair value process with optional mean reversion
- Correlated fair-value dynamics and cross-asset spread analytics
- Depth-sensitive market impact with permanent and temporary components
- Shock engine for liquidity withdrawal, sell programs, volatility spikes, and fair-value jumps
- Optional circuit breakers for regulation experiments
- Optional minimum resting time regulation for cancellation friction experiments
- Optional cancel-to-order ratio limits for anti-spoofing and cancellation-budget experiments
- Order lifecycle analytics: fill rates, cancellation rates, partial cancellations, quote lifetimes, and queue-priority diagnostics
- Explicit modify-rate and priority-reset analytics for quote-churn experiments
- Flash-crash detection and recovery analytics
- CLI-driven scenario runs with YAML configs and benchmark summaries
- Parameter-sweep automation with cartesian config overrides and per-case seed families
- Multi-seed benchmark aggregation with leaderboard outputs
- Run, benchmark, and sweep plotting workflows for saved JSON artifacts
- Markdown report generation and one-command research bundles for benchmark and sweep artifacts
- Bundle publication metadata with reproducibility manifests, regeneration commands, and render-ready QMD output
- Benchmarks, tests, docs, and a Quarto report scaffold

## Repo Tree

```text
mercury-market-sim/
  README.md
  LICENSE
  pyproject.toml
  docs/
    architecture.md
    math.md
    experiments.md
  mercury/
    __init__.py
    config.py
    agents/
      __init__.py
      arbitrage.py
      base.py
      execution.py
      latency_arbitrage.py
      market_maker.py
      momentum.py
      noise.py
      panic_seller.py
      pairs_arbitrage.py
      rebalancer.py
      spoofer.py
      stop_loss.py
      venue_arbitrage.py
    cli/
      __init__.py
      app.py
    exchange/
      __init__.py
      matching_engine.py
      order.py
      order_book.py
      trade.py
    experiments/
      __init__.py
      benchmark.py
      runner.py
      sweep.py
      scenarios.py
    metrics/
      __init__.py
      agent_pnl.py
      crash_metrics.py
      market_quality.py
      price_dynamics.py
    processes/
      __init__.py
      arrivals.py
      fair_value.py
      shocks.py
    reports/
      __init__.py
      markdown.py
      publish.py
    sim/
      __init__.py
      clock.py
      engine.py
      events.py
      logger.py
    viz/
      __init__.py
      book_heatmap.py
      plots.py
  configs/
    baseline.yaml
    cross_asset_pairs.yaml
    cross_asset_rebalance_spillover.yaml
    fragmented_venues_arb.yaml
    iceberg_execution.yaml
    execution_liquidation.yaml
    flash_crash.yaml
    flash_crash_circuit_breaker.yaml
    latency_arb_stale_quotes.yaml
    maker_taker_fragmentation.yaml
    minimum_resting_time.yaml
    panic_liquidation_cascade.yaml
    pegged_execution.yaml
    quote_churn_priority_reset.yaml
    spoofing_cancel_limit.yaml
    spoofing_pressure.yaml
    stop_loss_cascade.yaml
    shock_large_sell_program.yaml
    shock_liquidity_withdrawal.yaml
    sweeps/
      flash_crash_resilience_grid.yaml
  quarto/
    report.qmd
  tests/
    test_agents.py
    test_benchmark.py
    test_matching_engine.py
    test_metrics.py
    test_order_book.py
    test_publish.py
    test_shocks.py
    test_sweep.py
    test_viz.py
```

## Quickstart

```bash
python -m mercury.cli.app run --config configs/baseline.yaml --output outputs/baseline.json
python -m mercury.cli.app run --config configs/cross_asset_pairs.yaml --output outputs/cross_asset_pairs.json
python -m mercury.cli.app run --config configs/cross_asset_rebalance_spillover.yaml --output outputs/cross_asset_rebalance_spillover.json
python -m mercury.cli.app run --config configs/fragmented_venues_arb.yaml --output outputs/fragmented_venues_arb.json
python -m mercury.cli.app run --config configs/iceberg_execution.yaml --output outputs/iceberg_execution.json
python -m mercury.cli.app run --config configs/latency_arb_stale_quotes.yaml --output outputs/latency_arb.json
python -m mercury.cli.app run --config configs/maker_taker_fragmentation.yaml --output outputs/maker_taker_fragmentation.json
python -m mercury.cli.app run --config configs/panic_liquidation_cascade.yaml --output outputs/panic_cascade.json
python -m mercury.cli.app run --config configs/pegged_execution.yaml --output outputs/pegged_execution.json
python -m mercury.cli.app run --config configs/quote_churn_priority_reset.yaml --output outputs/quote_churn.json
python -m mercury.cli.app run --config configs/spoofing_cancel_limit.yaml --output outputs/spoofing_cancel_limit.json
python -m mercury.cli.app run --config configs/spoofing_pressure.yaml --output outputs/spoofing_pressure.json
python -m mercury.cli.app run --config configs/stop_loss_cascade.yaml --output outputs/stop_loss_cascade.json
python -m mercury.cli.app benchmark --output-dir outputs/benchmarks
python -m mercury.cli.app benchmark --output-dir outputs/benchmarks_fragility --scenario flash_crash --scenario flash_crash_circuit_breaker --reuse-existing
python -m mercury.cli.app benchmark --output-dir outputs/benchmarks_multi --seed-count 3
python -m mercury.cli.app sweep --spec configs/sweeps/flash_crash_resilience_grid.yaml --output-dir outputs/sweeps/flash_crash_resilience
python -m mercury.cli.app plot-run --input outputs/spoofing_cancel_limit.json --output-dir outputs/plots/spoofing_cancel_limit
python -m mercury.cli.app plot-benchmark --summary outputs/benchmarks/summary.json --leaderboard outputs/benchmarks/leaderboard.json --output-dir outputs/plots/benchmarks
python -m mercury.cli.app plot-sweep --summary outputs/sweeps/flash_crash_resilience/summary.json --spec outputs/sweeps/flash_crash_resilience/spec.json --leaderboard outputs/sweeps/flash_crash_resilience/leaderboard.json --output-dir outputs/plots/sweeps/flash_crash_resilience
python -m mercury.cli.app report-benchmark --summary outputs/benchmarks/summary.json --leaderboard outputs/benchmarks/leaderboard.json --benchmark-plots-dir outputs/plots/benchmarks --sweep-summary outputs/sweeps/flash_crash_resilience/summary.json --sweep-spec outputs/sweeps/flash_crash_resilience/spec.json --sweep-plots-dir outputs/plots/sweeps/flash_crash_resilience --output outputs/reports/research_report.md
python -m mercury.cli.app publish-report --summary outputs/benchmarks/summary.json --leaderboard outputs/benchmarks/leaderboard.json --benchmark-plots-dir outputs/plots/benchmarks --output-dir outputs/published_report --render-html
python -m mercury.cli.app bundle-report --output-dir outputs/research_bundle --seed-count 1 --sweep-spec configs/sweeps/flash_crash_resilience_grid.yaml --render-html
pytest
```

## Notes

- The simulator is deterministic under a fixed seed.
- Runtime dependencies are standard-library only.
- Plotting functions use `matplotlib` only if it is installed.
- Benchmarks now write per-scenario JSON plus `summary.json` and `summary.md`.
- `benchmark --scenario ...` runs a selected subset of built-in scenarios instead of the full benchmark suite.
- `benchmark --reuse-existing` reuses cached per-scenario outputs when the requested seed family already exists in the output directory.
- Multi-seed benchmarks also write `leaderboard.json` and `leaderboard.md`.
- Sweep runs write per-case seed JSON, per-case `aggregate.json`, plus top-level `spec.json`, `summary.json`, `summary.md`, `leaderboard.json`, and `leaderboard.md`.
- `plot-run` generates price, liquidity, strategy-PnL, and market-state heatmap figures from a saved run JSON.
- `plot-benchmark` generates a benchmark landscape scatter plot, fragility leaderboard, and fee-economics chart from benchmark summary files.
- `plot-sweep` generates objective, trade-off, and leaderboard figures from sweep summary files.
- `report-benchmark` writes a markdown research note from benchmark outputs and optional sweep artifacts.
- `publish-report` packages existing benchmark and optional sweep artifacts into a reproducible bundle without rerunning simulations.
- `bundle-report` runs benchmark, plots, optional sweep, report generation, and bundle publication into a single reproducible directory.
- `bundle-report --scenario ...` limits the benchmark portion of the bundle to named scenarios.
- `bundle-report --reuse-existing` reuses cached benchmark and sweep artifacts inside the bundle directory when they already match the requested run.
- Published bundles now include `bundle_manifest.json`, `README.md`, `reproduce_commands.txt`, `research_report.qmd`, and `render_status.json`.
- `bundle-report --render-html` attempts to render `research_report.qmd` to `research_report.html` when Quarto is installed.
- Benchmark summaries include cross-asset pair metrics when applicable.
- Benchmark summaries include cross-asset spillover metrics such as `cojump_frequency_mean` and `tail_alignment_mean`.
- Benchmark summaries include fragmented-market metrics such as `crossed_market_frequency_mean`, `mean_crossed_market_width_mean`, and `venue_arb_net_pnl_mean`.
- Benchmark summaries now include fee metrics such as `exchange_fee_revenue_mean`, `maker_fee_total_mean`, and `taker_fee_total_mean`.
- Benchmark summaries also include `latency_arb_net_pnl_mean` for stale-quote experiments.
- Benchmark summaries now include quote-churn metrics such as `modify_rate_mean` and `priority_reset_rate_mean`.
- Benchmark summaries now include iceberg metrics such as `iceberg_order_share_mean` and `iceberg_replenishment_rate_mean`.
- Benchmark summaries now include pegged-order metrics such as `pegged_order_share_mean` and `pegged_update_rate_mean`.
- Benchmark summaries also include panic-flow metrics such as `panic_inventory_change_mean` and `panic_seller_net_pnl_mean`.
- Benchmark summaries also include spoofing metrics such as `spoofer_net_pnl_mean`, `spoof_order_share_mean`, and `spoof_cancel_rate_mean`.
- Benchmark summaries also include cancel-cap metrics such as `cancel_limit_block_rate_mean`.
- Benchmark summaries also include stop-order metrics such as `stop_order_share_mean`, `stop_trigger_rate_mean`, and `stop_loss_net_pnl_mean`.
- The built-in benchmark set now includes institutional liquidation, passive iceberg execution, pegged passive execution, minimum-resting-time regulation, spoofing cancel-limit regulation, cross-asset pairs, cross-asset rebalancing spillover, fragmented venue arbitrage, latency-arbitrage, panic-liquidation, quote-churn, spoofing-pressure, and stop-loss-cascade scenarios.
- The built-in sweep spec `flash_crash_resilience_grid` varies maker participation and circuit-breaker sensitivity under flash-crash stress.
