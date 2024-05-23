function organizeCarsIntoSections(data: Pets[]): { title: string, data: Pets[] }[] {
    const sections: { [key: string]: Pets[] } = {};

    data.forEach(item => {
        const firstLetter = item.name.toUpperCase();

        if (!sections[firstLetter]) {
            sections[firstLetter] = [];
        }

        sections[firstLetter].push(item);
    });

    const organizedSections = Object.keys(sections).map(letter => ({
        title: letter,
        data: sections[letter]
    }));

    organizedSections.sort((a, b) => a.title.localeCompare(b.title));

    return organizedSections;
}

export default organizeCarsIntoSections;