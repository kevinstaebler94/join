let tasks = [
    {
        id: 'task-001',
        title: 'Team Meeting vorbereiten',
        description: 'Agenda für das wöchentliche Team Meeting erstellen und Teilnehmer einladen.',
        date: '2025/04/15',
        prio: 'medium',
        contact: ['Anna Schmidt', 'Max Müller'],
        subtask: ['Agenda schreiben', 'Meeting-Link erstellen', 'Teilnehmer einladen'],
        column: 'inProgress'
    },
    {
        id: 'task-002',
        title: 'Kundendaten aktualisieren',
        description: 'Die aktuellen Kundendaten in der Datenbank prüfen und fehlende Infos ergänzen.',
        date: '2025/04/16',
        prio: 'medium',
        contact: ['Lukas Weber'],
        subtask: ['Adresse prüfen', 'Telefonnummern ergänzen'],
        column: 'done'
    },
    {
        id: 'task-003',
        title: 'Landingpage finalisieren',
        description: 'Die letzte Review-Runde der neuen Landingpage durchführen und Feedback einarbeiten.',
        date: '2025/04/18',
        prio: 'medium',
        contact: ['Clara Meier', 'Ben Fischer'],
        subtask: ['Feedback einholen', 'Bilder anpassen', 'Responsive Design testen'],
        column: 'awaitFeedback'
    },
    {
        id: 'task-004',
        title: 'Social Media Plan erstellen',
        description: 'Content-Plan für den kommenden Monat vorbereiten und Posts terminieren.',
        date: '2025/04/20',
        prio: 'low',
        contact: ['Marie Jung'],
        subtask: ['Kalender anlegen', 'Contentideen sammeln', 'Post-Zeiten planen'],
        column: 'toDo'
    },
    {
        id: 'task-005',
        title: 'Fehler im Backend beheben',
        description: 'Das Problem mit der Benutzerregistrierung im Backend analysieren und fixen.',
        date: '2025/04/21',
        prio: 'urgent',
        contact: ['Tobias König'],
        subtask: ['Fehler lokalisieren', 'Bug fixen', 'Tests durchführen'],
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
    }
];

async function getGuestUserData() {
    let userId = 'guestMail';
    let email = userId;
    let password = 'password';
    let name = 'Guest User';
    let login = true;
    await changeUsers(userId, email, password, name, login);
    await getGuestUserTasks(userId);
    await getGuestUserContacts(userId);
    window.location.href = "summary.html";    
}

async function getGuestUserTasks(guestUser) {
    for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
        let taskObj = tasks[taskIndex];
        await pushGuestTasks(taskObj, guestUser);
    }
}

async function getGuestUserContacts(guestUser) {
    for (let contactIndex = 0; contactIndex < contacts.length; contactIndex++) {
        let contactObj = contacts[contactIndex];
        await pushGuestContacts(contactObj, guestUser)
    }
}