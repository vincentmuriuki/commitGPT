export function formatCommitMessage(rawMessage) {
    const regex = /```([\s\S]*?)```/;
    const match = rawMessage.match(regex);
    if (match && match[1]) {
        return match[1].trim();
    }

    return rawMessage
        .replace(/Here’s a suitable commit message for the changes you've made:/i, '')
        .trim();
}
