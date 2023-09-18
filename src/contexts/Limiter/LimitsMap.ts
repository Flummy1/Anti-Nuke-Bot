export const roles = {
    "1": "1131539393207865354",
    "2": "1087182852132704316",
    "3": "1036607828552601621",
    "4": "1131256525713846443",
    "5": "899178685947609088",
    "6": "979090905560649738",
    "7": "890311632994058280",
    "8": "940189148202012702",
    "everyone": "890304318643785769"
}

export const minuteLimits = {
    "channelDelete": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 3, punishment: "warn" },
        [roles["4"]]: { limit: 3, punishment: "warn" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "channelCreate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 3, punishment: "warn" },
        [roles["4"]]: { limit: 3, punishment: "warn" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "channelUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 2, punishment: "warn" },
        [roles["5"]]: { limit: 3, punishment: "warn" },
        [roles["4"]]: { limit: 3, punishment: "warn" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "roleDelete": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 3, punishment: "warn" },
        [roles["4"]]: { limit: 3, punishment: "warn" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "roleCreate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 3, punishment: "warn" },
        [roles["4"]]: { limit: 3, punishment: "warn" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "roleUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 2, punishment: "warn" },
        [roles["5"]]: { limit: 3, punishment: "warn" },
        [roles["4"]]: { limit: 3, punishment: "warn" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "userBan": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 3, punishment: "warn" },
        [roles["4"]]: { limit: 3, punishment: "warn" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "userUnban": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 3, punishment: "warn" },
        [roles["4"]]: { limit: 3, punishment: "warn" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "userKick": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 3, punishment: "warn" },
        [roles["4"]]: { limit: 3, punishment: "warn" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "webhookDelete": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "webhookCreate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "webhookUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "integrationDelete": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "integrationCreate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "integrationUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "serverUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    }
}

export const hourLimits = {
    "channelDelete": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 6, punishment: "quarantine" },
        [roles["4"]]: { limit: 6, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "channelCreate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 6, punishment: "quarantine" },
        [roles["4"]]: { limit: 6, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "channelUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 4, punishment: "quarantine" },
        [roles["5"]]: { limit: 6, punishment: "quarantine" },
        [roles["4"]]: { limit: 6, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "roleDelete": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 6, punishment: "quarantine" },
        [roles["4"]]: { limit: 6, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "roleCreate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 6, punishment: "quarantine" },
        [roles["4"]]: { limit: 6, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "roleUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 4, punishment: "quarantine" },
        [roles["5"]]: { limit: 6, punishment: "quarantine" },
        [roles["4"]]: { limit: 6, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "userBan": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 6, punishment: "quarantine" },
        [roles["4"]]: { limit: 6, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "userUnban": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 6, punishment: "quarantine" },
        [roles["4"]]: { limit: 6, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "userKick": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 6, punishment: "quarantine" },
        [roles["4"]]: { limit: 6, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "webhookDelete": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "webhookCreate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "webhookUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "integrationDelete": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "integrationCreate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "integrationUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 1, punishment: "quarantine" },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    },
    "serverUpdate": {
        [roles.everyone]: { limit: 1, punishment: "quarantine" },
        [roles["8"]]: { limit: 1, punishment: "quarantine" },
        [roles["7"]]: { limit: 1, punishment: "quarantine" },
        [roles["6"]]: { limit: 1, punishment: "quarantine" },
        [roles["5"]]: { limit: 1, punishment: "quarantine" },
        [roles["4"]]: { limit: 1, punishment: "quarantine" },
        [roles["3"]]: { limit: 0, punishment: null },
        [roles["2"]]: { limit: 0, punishment: null },
        [roles["1"]]: { limit: 0, punishment: null }
    }
}