/**
 * revision.js — Revision module data shape documentation.
 */

/**
 * @typedef {Object} RevisionData
 * @property {RevisionNote[]} notes - One-page note items
 * @property {MemoryTrick[]} memoryTricks - Mnemonics and memory techniques
 * @property {FormulaItem[]} formulas - Key formulas and equations
 * @property {KeyTerm[]} keyTerms - Glossary of important terms
 * @property {ChecklistItem[]} checklist - Pre-exam review checklist
 */

/**
 * @typedef {Object} RevisionNote
 * @property {string} id - Unique note ID
 * @property {string} title - Note heading
 * @property {string} content - Note body text
 * @property {string} [category] - Category label
 * @property {boolean} [isHighlighted] - Whether user marked as important
 */

/**
 * @typedef {Object} MemoryTrick
 * @property {string} id - Unique ID
 * @property {string} concept - The concept to remember
 * @property {string} mnemonic - The memory trick / acronym
 * @property {string} [explanation] - How the mnemonic works
 */

/**
 * @typedef {Object} FormulaItem
 * @property {string} id - Unique ID
 * @property {string} name - Formula name
 * @property {string} formula - The formula expression
 * @property {string} [description] - What the formula is used for
 * @property {string} [example] - Example usage
 */

/**
 * @typedef {Object} KeyTerm
 * @property {string} term - The term
 * @property {string} definition - Its definition
 * @property {string} [example] - Usage example
 */

/**
 * @typedef {Object} ChecklistItem
 * @property {string} id - Unique ID
 * @property {string} label - Checklist item text
 * @property {boolean} checked - Whether user has checked this item
 */
