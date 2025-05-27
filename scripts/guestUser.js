let tasks = [
    {
        category: 'User Story',
        id: 'task-001',
        title: 'Als Nutzer möchte ich mich registrieren können',
        description: 'Ein Registrierungsformular mit Validierung implementieren, damit neue Nutzer ein Konto erstellen können.',
        date: '2025/04/15',
        prio: 'medium',
        contact: ['Anna Schmidt', 'Max Müller'],
        subtask: [
            { subtask: 'Formular mit Feldern erstellen', done: false },
            { subtask: 'Clientseitige Validierung hinzufügen', done: false },
            { subtask: 'API-Endpunkt zur Registrierung integrieren', done: false }
        ],
        column: 'inProgress'
    },
    {
        category: 'User Story',
        id: 'task-002',
        title: 'Als Admin möchte ich alle Nutzer sehen',
        description: 'Eine Übersicht aller registrierten Nutzer im Admin-Panel anzeigen lassen.',
        date: '2025/04/16',
        prio: 'medium',
        contact: ['Lukas Weber'],
        subtask: [
            { subtask: 'Backend-Route erstellen', done: false },
            { subtask: 'Daten abrufen und formatieren', done: false },
            { subtask: 'Tabelle mit Nutzerdaten im Frontend anzeigen', done: false }
        ],
        column: 'done'
    },
    {
        category: 'User Story',
        id: 'task-003',
        title: 'Als Nutzer möchte ich die Landingpage auf dem Handy sehen',
        description: 'Die Landingpage für mobile Geräte optimieren.',
        date: '2025/04/18',
        prio: 'medium',
        contact: ['Clara Meier', 'Ben Fischer'],
        subtask: [
            { subtask: 'Responsives Layout mit CSS anpassen', done: false },
            { subtask: 'Mobile Tests mit DevTools', done: false },
            { subtask: 'Feedback vom Team einholen', done: false }
        ],
        column: 'awaitFeedback'
    },
    {
        category: 'User Story',
        id: 'task-004',
        title: 'Als Entwickler möchte ich einen sauberen Branch-Workflow nutzen',
        description: 'Dokumentation zum Git-Workflow für das Team bereitstellen und Prozesse vereinheitlichen.',
        date: '2025/04/20',
        prio: 'low',
        contact: ['Marie Jung'],
        subtask: [
            { subtask: 'Branching-Strategie dokumentieren', done: false },
            { subtask: 'Pull-Request-Template erstellen', done: false },
            { subtask: 'Team informieren', done: false }
        ],
        column: 'toDo'
    },
    {
        category: 'Technical Task',
        id: 'task-005',
        title: 'Bug: Registrierung schlägt fehl bei ungültiger E-Mail',
        description: 'Fehlerhafte Validierung im Backend bei ungültiger E-Mail-Adresse beheben.',
        date: '2025/04/21',
        prio: 'urgent',
        contact: ['Tobias König'],
        subtask: [
            { subtask: 'Fehler im Validator analysieren', done: false },
            { subtask: 'Testfälle anpassen', done: false },
            { subtask: 'Fix implementieren und testen', done: false }
        ],
        column: 'inProgress'
    }
];


let contacts = [
    {
        name: 'Anna Schmidt',
        email: 'anna.schmidt@example.com',
        phone: '+49 170 1234567'
    },
    {
        name: 'Max Müller',
        email: 'max.mueller@example.com',
        phone: '+49 151 9876543'
    },
    {
        name: 'Clara Meier',
        email: 'clara.meier@example.com',
        phone: '+49 160 2233445'
    },
    {
        name: 'Lukas Weber',
        email: 'lukas.weber@example.com',
        phone: '+49 152 3344556'
    },
    {
        name: 'Marie Jung',
        email: 'marie.jung@example.com',
        phone: '+49 176 6677889'
    },
    {
        name: 'Ben Fischer',
        email: 'ben.fischer@example.com',
        phone: '+49 157 9988776'
    },
    {
        name: 'Tobias König',
        email: 'tobias.koenig@example.com',
        phone: '+49 162 4455667'
    },
    {
        name: 'Lea Hoffmann',
        email: 'lea.hoffmann@example.com',
        phone: '+49 175 1122334'
    },
    {
        name: 'Julian Becker',
        email: 'julian.becker@example.com',
        phone: '+49 163 7788990'
    },
    {
        name: 'Nina Schröder',
        email: 'nina.schroeder@example.com',
        phone: '+49 159 3344556'
    }
];

/**
 * Initializes the guest user account with default credentials, tasks, and contacts.
 * Updates the user data and redirects to the summary page.
 * 
 * @async
 * @returns {Promise<void>}
 */
async function getGuestUserData() {
    let userId = 'guestMail';
    let email = userId;
    let password = 'password';
    let name = 'Guest User';
    let login = true;
    let greeting = true;
    await changeUsers(userId, greeting, email, password, name, login);
    await getGuestUserTasks(userId);
    await getGuestUserContacts(userId);
    window.location.href = "summary.html";
}

/**
 * Transfers all existing tasks to the guest user.
 * 
 * @async
 * @param {string} guestUser - The ID of the guest user.
 * @returns {Promise<void>}
 */
async function getGuestUserTasks(guestUser) {
    for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
        let taskObj = tasks[taskIndex];
        await pushGuestTasks(taskObj, guestUser);
    }
}

/**
 * Transfers all existing contacts to the guest user.
 * 
 * @async
 * @param {string} guestUser - The ID of the guest user.
 * @returns {Promise<void>}
 */
async function getGuestUserContacts(guestUser) {
    for (let contactIndex = 0; contactIndex < contacts.length; contactIndex++) {
        let contactObj = contacts[contactIndex];
        await pushGuestContacts(contactObj, guestUser)
    }
}