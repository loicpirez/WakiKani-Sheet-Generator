import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'kanji', 'radical', 'ja', 'reading'],
    allowedAttributes: {
        'a': ['href']
    }
};

const sanitize = (dirty: string) => ({
    __html: sanitizeHtml(dirty, { ...defaultOptions })
});


type SanitizeHTMLProps = {
    html: string;
}

const SanitizeHTML = ({ html }: SanitizeHTMLProps) => (
    <div dangerouslySetInnerHTML={sanitize(html)} />
);

export default SanitizeHTML
