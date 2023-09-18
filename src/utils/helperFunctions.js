// function to capitalize the first letter of a string
export const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

// calculate reading time based on description length
export const readingTime = (description) => {
    if (!description) return "1 minute";
    const wordsPerMinute = 200;
    const noOfWords = description.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return `${readTime} minute${readTime > 1 ? "s" : ""}`;
};

// read the description and return only three lines of it
export const descriptionSnippet = (description) => {
    if (!description) return "";

    // split the description into an array of lines by splitting at the full stop
    const lines = description.split(". ");

    // if the first line is less than 100 characters, return the first two lines
    if (lines.length === 1) return lines[0] + ".";
    if (lines[0].length < 100) return lines[0] + ". " + lines[1] + ".";
    // if the first line is more than 100 characters, return the first line
    return lines[0] + ".";
};

// read the title and return only first 10 words of it
export const titleSnippet = (title) => {
    if (!title) return "";

    // split the title into an array of words by splitting at the space
    const words = title.split(" ");

    // if the title is less than 10 words, return the title
    if (words.length <= 10) return title;
    // if the title is more than 10 words, return the first 10 words
    return words.slice(0, 10).join(" ") + " ...";
};
