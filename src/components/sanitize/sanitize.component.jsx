import React from 'react';
import sanitizeHtml from 'sanitize-html-react';

const defaultOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'ul', 'li', 'h2'],
  allowedAttributes: {
    a: ['href']
  }
};

const sanitize = dirty => {
  return sanitizeHtml(dirty, defaultOptions);
};

const SanitizeHTML = ({ html, ...otherProps }) => (
  <div {...otherProps} dangerouslySetInnerHTML={{ __html: sanitize(html) }} />
);

export default SanitizeHTML;
