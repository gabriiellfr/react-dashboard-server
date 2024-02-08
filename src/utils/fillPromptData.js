const fillTemplate = (prompt, data) => {
    return prompt.replace(/\$\{(\w+)\}/g, (match, key) => {
        return data[key] || match;
    });
};

module.exports = fillTemplate;
