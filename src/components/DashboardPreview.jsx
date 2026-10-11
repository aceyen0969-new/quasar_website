import { useState } from 'react'

const panels = ['Overview', 'Objectives', 'Activity']

const objectives = [
  {
    name: 'Improve server engagement',
    detail: 'Community growth',
    progress: 72,
    status: 'In progress',
  },
  {
    name: 'Review channel structure',
    detail: 'Server organization',
    progress: 46,
    status: 'In progress',
  },
  {
    name: 'Configure AI providers',
    detail: 'Assistant setup',
    progress: 100,
    status: 'Completed',
  },
]

const activity = [
  {
    type: 'AI',
    title: 'Assistant response generated',
    detail: 'A sample conversation was processed',
    time: '2 min ago',
  },
  {
    type: 'ANALYTICS',
    title: 'Server insights reviewed',
    detail: 'Community overview example',
    time: '14 min ago',
  },
  {
    type: 'OBJECTIVE',
    title: 'Objective progress updated',
    detail: 'Improve server engagement',
    time: '32 min ago',
  },
  {
    type: 'SYSTEM',
    title: 'Provider status checked',
    detail: 'Illustrative system activity',
    time: '1 hr ago',
  },
]

const chartBars = [32, 45, 38, 61, 48, 73, 55, 66, 46, 84, 62, 76]

function DashboardHeader({ activePanel, setActivePanel }) {
  return (
    <div className="dashboard-topbar">
      <div className="dashboard-brand">
        <span className="dashboard-brand-mark">Q</span>
        <div>
          <strong>Quasar</strong>
          <span>SERVER CONSOLE</span>
        </div>
      </div>

      <div className="dashboard-demo-badge">
        <span />
        INTERACTIVE PREVIEW
      </div>

      <div className="dashboard-profile" aria-label="Demo workspace">
        <span>Q</span>
      </div>

      <nav className="dashboard-tabs" aria-label="Dashboard preview sections">
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
    </div>
  )
}

function OverviewPanel() {
  return (
    <>
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-kicker">WORKSPACE OVERVIEW</span>
          <h3>Your server at a glance.</h3>
          <p>A sample snapshot of the tools Quasar brings together.</p>
        </div>
        <span className="dashboard-date">DEMO ENVIRONMENT</span>
      </div>

      <div className="dashboard-stat-grid">
        <article className="dashboard-stat">
          <span>AI interactions</span>
          <strong>1,284</strong>
          <small><i>+</i> 12.8% <span>sample trend</span></small>
          <div className="dashboard-sparkline spark-purple">
            {[35, 48, 39, 62, 54, 77, 67, 88].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </article>

        <article className="dashboard-stat">
          <span>Active objectives</span>
          <strong>08</strong>
          <small><i>●</i> 3 near completion</small>
          <div className="dashboard-stat-icon purple-icon">◎</div>
        </article>

        <article className="dashboard-stat">
          <span>Insights generated</span>
          <strong>36</strong>
          <small><i>+</i> 6 this week</small>
          <div className="dashboard-stat-icon blue-icon">⌁</div>
        </article>
      </div>

      <div className="dashboard-content-grid">
        <article className="dashboard-panel dashboard-chart-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-kicker">ACTIVITY OVERVIEW</span>
              <h4>Interaction activity</h4>
            </div>
            <span className="dashboard-period">LAST 12 PERIODS</span>
          </div>

          <div
            className="dashboard-chart"
            role="img"
            aria-label="Illustrative bar chart showing varying interaction activity"
          >
            <div className="dashboard-chart-grid">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="dashboard-chart-bars">
              {chartBars.map((height, index) => (
                <div className="dashboard-chart-column" key={index}>
                  <span
                    style={{ height: `${height}%` }}
                    className={index === 9 ? 'highlight' : ''}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-chart-labels">
            <span>PERIOD 01</span>
            <span>PERIOD 06</span>
            <span>PERIOD 12</span>
          </div>
        </article>

        <article className="dashboard-panel dashboard-objectives-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-kicker">PERSISTENT OBJECTIVES</span>
              <h4>Keep progress visible</h4>
            </div>
            <span className="dashboard-count">03</span>
          </div>

          <div className="dashboard-mini-objectives">
            {objectives.map((objective) => (
              <div className="dashboard-mini-objective" key={objective.name}>
                <div className="dashboard-mini-objective-top">
                  <span>{objective.name}</span>
                  <strong>{objective.progress}%</strong>
                </div>
                <div className="dashboard-progress-track">
                  <span style={{ width: `${objective.progress}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-panel-foot">
            <span className="dashboard-live-dot" />
            Example objective tracking
          </div>
        </article>
      </div>

      <p className="dashboard-disclaimer">
        Illustrative data for preview purposes. Not connected to a live server.
      </p>
    </>
  )
}

function ObjectivesPanel() {
  return (
    <div className="dashboard-detail-panel">
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-kicker">OBJECTIVE TRACKER</span>
          <h3>Progress with a purpose.</h3>
          <p>An example of how tracked goals could be presented.</p>
        </div>
        <span className="dashboard-date">SAMPLE DATA</span>
      </div>

      <div className="dashboard-objective-list">
        {objectives.map((objective, index) => (
          <article className="dashboard-objective-row" key={objective.name}>
            <span className="dashboard-objective-index">0{index + 1}</span>
            <div className="dashboard-objective-main">
              <div className="dashboard-objective-title">
                <div>
                  <h4>{objective.name}</h4>
                  <p>{objective.detail}</p>
                </div>
                <span className={objective.progress === 100 ? 'objective-complete' : 'objective-active'}>
                  {objective.status}
                </span>
              </div>
              <div className="dashboard-progress-track">
                <span style={{ width: `${objective.progress}%` }} />
              </div>
              <small>{objective.progress}% complete</small>
            </div>
          </article>
        ))}
      </div>

      <p className="dashboard-disclaimer">
        Example objectives only. Progress is not stored or connected to a server.
      </p>
    </div>
  )
}

function ActivityPanel() {
  return (
    <div className="dashboard-detail-panel">
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-kicker">ACTIVITY TIMELINE</span>
          <h3>A clearer view of activity.</h3>
          <p>Sample events showing the kinds of activity a console could surface.</p>
        </div>
        <span className="dashboard-date">DEMO FEED</span>
      </div>

      <div className="dashboard-activity-list">
        {activity.map((item, index) => (
          <article className="dashboard-activity-item" key={item.title}>
            <span className={`dashboard-activity-marker marker-${index}`} />
            <div className="dashboard-activity-copy">
              <span className="dashboard-activity-type">{item.type}</span>
              <h4>{item.title}</h4>
              <p>{item.detail}</p>
            </div>
            <time>{item.time}</time>
          </article>
        ))}
      </div>

      <p className="dashboard-disclaimer">
        This is a static example feed, not live bot telemetry.
      </p>
    </div>
  )
}

export default function DashboardPreview() {
  const [activePanel, setActivePanel] = useState('Overview')

  return (
    <section className="dashboard-section section-shell" aria-labelledby="dashboard-title">
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
          Explore a concept dashboard for AI activity, server insights, and
          persistent objectives. Switch views to see the interface in action.
        </p>
      </div>

      <div className="dashboard-window">
        <DashboardHeader
          activePanel={activePanel}
          setActivePanel={setActivePanel}
        />

        <div className="dashboard-body">
          {activePanel === 'Overview' && <OverviewPanel />}
          {activePanel === 'Objectives' && <ObjectivesPanel />}
          {activePanel === 'Activity' && <ActivityPanel />}
        </div>
      </div>
    </section>
  )
}
