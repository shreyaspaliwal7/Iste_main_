import teamData from './TeamData2025';

// Filter for 3rd year members who have "Head" in their vertical
const allHeads = teamData.filter(member => {
    const isThirdYear = member.year === "3rd" || member.year === "3";
    const isHead = member.vertical && (member.vertical.toLowerCase().includes("head") || member.vertical.toLowerCase().includes("secretary"));
    return isThirdYear && isHead;
});

// Categorize into departments
export const technicalHeads = allHeads.filter(member =>
    /technical|web/i.test(member.vertical)
);

export const creativeHeads = allHeads.filter(member =>
    /creative|media|design|art/i.test(member.vertical)
);

export const managementHeads = allHeads.filter(member =>
    // Exclude ones already caught by Technical/Creative
    !/technical|web|creative|media|design|art/i.test(member.vertical)
);

export default allHeads;
