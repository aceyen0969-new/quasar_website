import { useCallback, useEffect, useState } from 'react'
import './DashBoardLive.css'

const panels = ['Overview', 'Objectives', 'Activity']

const numberFormat = new Intl.NumberFormat()

function formatNumber(value) {
  return numberFormat.format(Number(value) || 0)
}

function formatDate(value) {
  if (!value) return 'Unknown date'

  const date = new Date(`${value}T00:00:00Z`)

  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function formatTimestamp(value) {
  if (!value) return 'Not recorded'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return 'Unknown time'

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function titleCase(value) {
  if (!value) return 'Unknown'

  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function DashboardHeader({
  activePanel,
  setActivePanel,
  connectionState,
  serverName,
  onRefresh,
  refreshing,
}) {
  const isConnected = connectionState === 'connected'

  return (
    <>
      <div className="dashboard-topbar">
        <div className="dashboard-brand">
          <span className="dashboard-brand-mark">Q</span>
          <div>
            <strong>Quasar</strong>
            <span>SERVER CONSOLE</span>
          </div>
        </div>

        <div
          className={`dashboard-live-badge ${isConnected ? 'is-connected' : ''}`}
          role="status"
        >
          <span />
          {isConnected
            ? 'LIVE CONNECTION'
            : connectionState === 'loading'
              ? 'CONNECTING'
              : 'DISCONNECTED'}
        </div>

        <div className="dashboard-profile" aria-label="Quasar workspace">
          Q
        </div>
      </div>

      <div className="dashboard-toolbar">
        <div className="dashboard-server-label">
          <span className="dashboard-kicker">CONNECTED SERVER</span>
          <strong>{serverName || 'Waiting for Quasar...'}</strong>
        </div>

        <button
          type="button"
          className="dashboard-refresh-button"
          onClick={onRefresh}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshingâ€¦' : 'â†» Refresh'}
        </button>
      </div>

      <nav className="dashboard-tabs" aria-label="Dashboard sections">
        {panels.map((panel) => (
          <button
            type="button"
            key={panel}
            className={activePanel === panel ? 'active' : ''}
            onClick={() => setActivePanel(panel)}
            aria-pressed={activePanel === panel}
          >
            {panel}
          </button>
        ))}
      </nav>
    </>
  )
}

function DashboardError({ message, onRetry }) {
  return (
    <div className="dashboard-state" role="alert">
      <span className="dashboard-kicker">CONNECTION ISSUE</span>
      <h3>Quasar isn't ready to report.</h3>
      <p>{message}</p>
      <button
        type="button"
        className="dashboard-refresh-button"
        onClick={onRetry}
      >
        Try again
      </button>
      <p className="dashboard-state-help">
        Check that the Discord bot is running, the dashboard token matches,
        and the configured server ID is correct.
      </p>
    </div>
  )
}

function StatCard({ label, value, detail, icon }) {
  return (
    <article className="dashboard-stat">
      <span>{label}</span>
      <strong>{formatNumber(value)}</strong>
      <small>{detail}</small>
      <div className="dashboard-stat-icon purple-icon" aria-hidden="true">
        {icon}
      </div>
    </article>
  )
}

function ProviderPanel({ providers }) {
  const entries = Object.entries(providers || {})

  return (
    <article className="dashboard-panel dashboard-provider-panel">
      <div className="dashboard-panel-heading">
        <div>
          <span className="dashboard-kicker">AI HEALTH</span>
          <h4>Provider status</h4>
        </div>
        <span className="dashboard-count">{entries.length}</span>
      </div>

      {entries.length === 0 ? (
        <p className="dashboard-empty">
          No provider health data is available yet.
        </p>
      ) : (
        <div className="dashboard-provider-list">
          {entries.map(([name, provider]) => {
            const status = provider.status || 'unknown'

            return (
              <div className="dashboard-provider-row" key={name}>
                <span>{name}</span>
                <span className={`dashboard-provider-status status-${status}`}>
                  <i />
                  {titleCase(status)}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <div className="dashboard-panel-foot">
        <span className="dashboard-live-dot" />
        Read from Quasar's running process
      </div>
    </article>
  )
}

function OverviewPanel({ data }) {
  const overview = data.overview || {}
  const dailyActivity = data.dailyActivity || []
  const maxMessages = Math.max(
    1,
    ...dailyActivity.map((day) => Number(day.message_count) || 0),
  )

  return (
    <>
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-kicker">WORKSPACE OVERVIEW</span>
          <h3>Your server at a glance.</h3>
          <p>
            Live analytics from {data.server.name}, supplied by Quasar's
            Python backend.
          </p>
        </div>
        <span className="dashboard-date">
          {formatNumber(data.server.memberCount)} MEMBERS
        </span>
      </div>

      <div className="dashboard-stat-grid">
        <StatCard
          label="Messages, last 7 days"
          value={overview.messagesLast7Days}
          detail="Recorded server activity"
          icon="â†—"
        />

        <StatCard
          label="Active members, last 7 days"
          value={overview.activeMembersLast7Days}
          detail="Unique authors in recorded activity"
          icon="â—Ž"
        />

        <StatCard
          label="Active objectives"
          value={overview.activeObjectives}
          detail={`${formatNumber(overview.totalMessages)} messages recorded all-time`}
          icon="âŒ"
        />
      </div>

      <div className="dashboard-content-grid">
        <article className="dashboard-panel dashboard-chart-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-kicker">ACTIVITY OVERVIEW</span>
              <h4>Daily message activity</h4>
            </div>
            <span className="dashboard-period">LAST 7 DAYS</span>
          </div>

          {dailyActivity.length === 0 ? (
            <p className="dashboard-empty">
              No daily activity has been recorded yet.
            </p>
          ) : (
            <>
              <div
                className="dashboard-chart"
                role="img"
                aria-label="Bar chart of recorded messages for the last seven days"
              >
                <div className="dashboard-chart-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="dashboard-chart-bars">
                  {dailyActivity.map((day) => {
                    const count = Number(day.message_count) || 0
                    const height = count
                      ? Math.max(6, (count / maxMessages) * 100)
                      : 3

                    return (
                      <div
                        className="dashboard-chart-column"
                        key={day.date}
                        title={`${formatDate(day.date)}: ${formatNumber(count)} messages`}
                      >
                        <span
                          className={count === maxMessages ? 'highlight' : ''}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="dashboard-chart-labels">
                {dailyActivity.map((day) => (
                  <span key={day.date}>{formatDate(day.date)}</span>
                ))}
              </div>
            </>
          )}
        </article>

        <ProviderPanel providers={data.aiProviders} />
      </div>

      <p className="dashboard-disclaimer">
        Updated {formatTimestamp(data.updatedAt)}. Activity totals include
        messages recorded by Quasar, not necessarily every message sent before
        analytics was enabled.
      </p>
    </>
  )
}

function ObjectivesPanel({ objectives }) {
  return (
    <div className="dashboard-detail-panel">
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-kicker">OBJECTIVE TRACKER</span>
          <h3>Progress with a purpose.</h3>
          <p>
            Objectives saved in Quasar's database, with their real statuses
            and priorities.
          </p>
        </div>
        <span className="dashboard-date">
          {formatNumber(objectives.length)} OBJECTIVES
        </span>
      </div>

      {objectives.length === 0 ? (
        <div className="dashboard-empty dashboard-empty-large">
          No saved objectives were found for this server.
        </div>
      ) : (
        <div className="dashboard-objective-list">
          {objectives.map((objective, index) => (
            <article className="dashboard-objective-row" key={objective.id}>
              <span className="dashboard-objective-index">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="dashboard-objective-main">
                <div className="dashboard-objective-title">
                  <div>
                    <h4>{objective.objective}</h4>
                    <p>
                      {objective.description || 'No description provided.'}
                    </p>
                  </div>

                  <span
                    className={`dashboard-objective-status objective-status-${objective.status}`}
                  >
                    {titleCase(objective.status)}
                  </span>
                </div>

                <div className="dashboard-objective-meta">
                  <span>Priority: {titleCase(objective.priority)}</span>
                  <span>Updated: {formatTimestamp(objective.updatedAt)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="dashboard-disclaimer">
        Quasar does not currently store a numeric completion percentage for
        each objective, so this dashboard displays actual statuses instead
        of inventing progress values.
      </p>
    </div>
  )
}

function ActivityPanel({ dailyActivity }) {
  return (
    <div className="dashboard-detail-panel">
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-kicker">ACTIVITY TIMELINE</span>
          <h3>See the activity pattern.</h3>
          <p>Daily message totals recorded by Quasar's analytics observer.</p>
        </div>
        <span className="dashboard-date">LAST 7 DAYS</span>
      </div>

      {dailyActivity.length === 0 ? (
        <div className="dashboard-empty dashboard-empty-large">
          No activity history is available yet.
        </div>
      ) : (
        <div className="dashboard-activity-list">
          {[...dailyActivity].reverse().map((day, index) => (
            <article className="dashboard-activity-item" key={day.date}>
              <span className={`dashboard-activity-marker marker-${index % 4}`} />

              <div className="dashboard-activity-copy">
                <span className="dashboard-activity-type">DAILY ANALYTICS</span>
                <h4>{formatDate(day.date)}</h4>
                <p>Recorded messages for this day</p>
              </div>

              <strong className="dashboard-activity-count">
                {formatNumber(day.message_count)}
              </strong>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

export default function DashboardPreview() {
  const [activePanel, setActivePanel] = useState('Overview')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const refresh = useCallback(async (signal) => {
    setError('')
    setRefreshing(true)

    try {
      const token = window.sessionStorage.getItem('quasar_session_token')

      if (!token) {
        window.location.assign('/login')
        return
      }

      const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
        signal,
      })

      if (response.status === 401) {
        window.sessionStorage.removeItem('quasar_session_token')
        window.location.assign('/login')
        throw new Error('Your session expired. Please sign in again.')
      }

      if (!response.ok) {
        let message = `Dashboard request failed (${response.status}).`

        try {
          const result = await response.json()
          if (result.error) message = result.error
        } catch {
          message = `Dashboard request failed (${response.status}).`
        }

        throw new Error(message)
      }

      const result = await response.json()
      setData(result)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') {
        setError(requestError.message || 'Unable to connect to Quasar.')
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
        setRefreshing(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const initialRefresh = window.setTimeout(() => {
      refresh(controller.signal)
    }, 0)

    const interval = window.setInterval(() => {
      refresh(controller.signal)
    }, 15000)

    return () => {
      controller.abort()
      window.clearTimeout(initialRefresh)
      window.clearInterval(interval)
    }
  }, [refresh])

  const connectionState = data && !error
    ? 'connected'
    : loading
      ? 'loading'
      : 'disconnected'

  return (
    <section
      className="dashboard-section section-shell"
      aria-labelledby="dashboard-title"
    >
      <div className="dashboard-section-heading">
        <div>
          <div className="eyebrow">A LOOK INSIDE QUASAR</div>
          <h2 id="dashboard-title">
            Insight at a glance.
            <br />
            <span>Progress in one place.</span>
          </h2>
        </div>

        <p>
          Live server analytics, AI provider health, and persistent objectives
          from your running Quasar bot.
        </p>
      </div>

      <div className="dashboard-window">
        <DashboardHeader
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          connectionState={connectionState}
          serverName={data?.server?.name}
          onRefresh={() => refresh()}
          refreshing={refreshing}
        />

        <div className="dashboard-body">
          {loading && !data && !error ? (
            <div className="dashboard-state" role="status">
              <span className="dashboard-kicker">CONNECTING TO QUASAR</span>
              <h3>Loading live server dataâ€¦</h3>
              <p>Waiting for the Python backend to respond.</p>
            </div>
          ) : error && !data ? (
            <DashboardError
              message={error}
              onRetry={() => refresh()}
            />
          ) : data ? (
            <>
              {error && (
                <div className="dashboard-inline-warning" role="status">
                  Refresh failed. Showing the last successful response.
                  <button type="button" onClick={() => refresh()}>
                    Retry
                  </button>
                </div>
              )}

              {activePanel === 'Overview' && <OverviewPanel data={data} />}

              {activePanel === 'Objectives' && (
                <ObjectivesPanel objectives={data.objectives || []} />
              )}

              {activePanel === 'Activity' && (
                <ActivityPanel dailyActivity={data.dailyActivity || []} />
              )}
            </>
          ) : (
            <DashboardError
              message={error || 'No dashboard data is available.'}
              onRetry={() => refresh()}
            />
          )}
        </div>
      </div>
    </section>
  )
}

