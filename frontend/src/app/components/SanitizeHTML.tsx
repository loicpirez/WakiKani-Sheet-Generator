import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'kanji', 'radical', 'ja', 'reading'],
    allowedAttributes: {
        'a': ['href']
    }
};

const sanitize = (dirty) => ({
    __html: sanitizeHtml(dirty, { ...defaultOptions })
});

const SanitizeHTML = ({ html }) => (
    <div dangerouslySetInnerHTML={sanitize(html)} />
);

export default SanitizeHTML