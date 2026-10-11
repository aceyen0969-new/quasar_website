
export const docsPages = [
  {
    path: '/docs/getting-started',
    title: 'Getting Started',
    description: 'Learn what Quasar is and how to begin.',
    sections: [
      {
        heading: 'Welcome to Quasar',
        content:
          'Quasar is an AI-assisted Discord bot project designed to help communities understand activity, organize information, and work with persistent objectives.',
      },
      {
        heading: 'What you will need',
        content:
          'You will need access to a Discord server where you can invite bots, plus the permissions required for the commands and features you intend to use.',
      },
      {
        heading: 'Before you begin',
        content:
          'Available commands and capabilities depend on the version deployed to your server. Use the commands available in Discord as your source of truth.',
      },
    ],
  },
  {
    path: '/docs/installation',
    title: 'Installation',
    description: 'Understand the setup process for a Discord bot.',
    sections: [
      {
        heading: 'Prepare your server',
        content:
          'Choose a Discord server where you have permission to add applications. Review the bot permissions carefully before authorizing it.',
      },
      {
        heading: 'Configure the bot',
        content:
          'A self-hosted deployment typically requires a Discord bot token and the API keys for whichever AI providers are configured. Store secrets in environment variables and never publish them.',
      },
      {
        heading: 'Verify the deployment',
        content:
          'After starting the bot, check its logs for successful Discord login, command synchronization, and any provider configuration errors.',
      },
    ],
  },
  {
    path: '/docs/commands',
    title: 'Commands',
    description: 'A guide to interacting with Quasar.',
    sections: [
      {
        heading: 'Slash commands',
        content:
          'Quasar uses Discord application commands. Open the slash-command picker in your server to see the commands registered by your current deployment.',
      },
      {
        heading: 'Command availability',
        content:
          'The exact commands can change as development continues. A command may also require particular Discord permissions or configuration.',
      },
      {
        heading: 'Troubleshooting commands',
        content:
          'If a command does not appear, check that the bot is online, the command sync completed, and you are using the intended server.',
      },
    ],
  },
  {
    path: '/docs/objectives',
    title: 'Persistent Objectives',
    description: 'Track objectives and review their history.',
    sections: [
      {
        heading: 'What are objectives?',
        content:
          'Objectives provide a way to record goals or tasks that should remain available beyond a single conversation.',
      },
      {
        heading: 'Status and history',
        content:
          'Use the objective commands available in your deployment to review current status and recorded history. Exact behavior depends on the installed version.',
      },
      {
        heading: 'Data persistence',
        content:
          'If the deployment uses SQLite, its database file must live on storage that persists across restarts and redeployments. Confirm the configured database path before relying on long-term records.',
      },
    ],
  },
  {
    path: '/docs/analytics',
    title: 'Analytics',
    description: 'Learn about server analysis and reports.',
    sections: [
      {
        heading: 'Server analysis',
        content:
          'Analytics can help summarize information available to the bot, such as server structure or other configured signals.',
      },
      {
        heading: 'Scheduled reports',
        content:
          'If scheduled analytics are enabled in your deployment, verify their schedule, output destination, and provider configuration in the bot logs.',
      },
      {
        heading: 'Interpreting results',
        content:
          'AI-generated analysis is advisory. Review recommendations before making changes to your server.',
      },
    ],
  },
  {
    path: '/docs/troubleshooting',
    title: 'Troubleshooting',
    description: 'Find common checks for deployment problems.',
    sections: [
      {
        heading: 'The bot is offline',
        content:
          'Check the hosting service, startup logs, Discord token configuration, and network connectivity.',
      },
      {
        heading: 'AI responses fail',
        content:
          'Inspect provider errors, model availability, rate limits, API quotas, and fallback configuration. Keep API keys private when sharing logs.',
      },
      {
        heading: 'Data disappears after restart',
        content:
          'Check whether the database is stored on persistent storage and whether the running service is using the expected database path.',
      },
    ],
  },
]
