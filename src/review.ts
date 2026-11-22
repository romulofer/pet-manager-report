// Content taken from README.md and REPORT.md of the backend project.

export const changes = [
	{
		problem: 'Failures looked like successes',
		detail: 'A missing pet or bad data got “200 OK” with the error hidden inside.',
		fix: 'Right status codes (404, 400) with a stable code and a per-field errors map, as application/problem+json.'
	},
	{
		problem: 'Data was changed or lost silently',
		detail: 'A misspelled field was ignored; an age of 2.5 was saved as 2.',
		fix: 'Unknown fields and wrong types are refused with a 400 that names the field.'
	},
	{
		problem: 'Storage glued to the rest of the code',
		detail: 'The service used the in-memory class directly, backed by a plain HashMap.',
		fix: 'A PetRepository interface, thread-safe store, string ids. A real database only adds a class.'
	},
	{
		problem: 'No rules on the data',
		detail: 'Anything was accepted.',
		fix: 'Age 0–100, text up to 100 characters, extra spaces trimmed, blank owner becomes null.'
	},
	{
		problem: 'Known security weaknesses',
		detail: '60 public advisories in outdated runtime libraries.',
		fix: 'Spring Boot 3.5.8 → 3.5.16 with pinned Tomcat and Jackson, plus nosniff / no-store headers.'
	},
	{
		problem: 'Wrong docs and few tests',
		detail: 'The developer notes described a JPA/H2 setup that does not exist; only 9 tests.',
		fix: 'Docs rewritten to match the code (the original notes were kept); 78 tests.'
	}
];

export const stats = [
	{ value: '78', label: 'tests', note: 'up from 9 (56 integration, 22 end-to-end)' },
	{ value: '60 → 4', label: 'known vulnerabilities', note: 'the remaining 4 do not look reachable' },
	{ value: '97%', label: 'line coverage', note: '88% of branches' },
	{ value: String(changes.length), label: 'problems fixed', note: 'listed below' }
];

export const behaviorChanges = [
	'Errors are no longer “200 OK”.',
	'Unknown JSON fields and decimal ages are rejected with 400. An id sent in a body is ignored.',
	'A pet’s id is now a string ("1", was 1). Any string is a valid id, so GET /api/pets/abc is a 404.'
];

export const decisions = [
	{
		title: 'String ids',
		body: 'A document store needs no change to model, controller or DTOs. Cost: the JSON change above.'
	},
	{
		title: 'insert / update, not save',
		body: 'save is an upsert in most stores. These map to insertOne / replaceOne in Mongo.'
	},
	{ title: 'ProblemDetail errors', body: 'Standard (RFC 9457), least code, no custom error body.' },
	{ title: 'Strict JSON', body: 'Chosen over silent data loss, even though it is breaking.' },
	{ title: 'Idempotent DELETE', body: '204 even when the pet is missing.' },
	{ title: 'Two identical request DTOs', body: 'POST and PUT usually diverge, so they are kept apart.' }
];

export const leftOut = [
	'Unit tests (recommended first): a repository contract test and mapper tests',
	'Request size limits: one string can be ~20 million characters before validation rejects it',
	'Authentication and rate limiting: anyone who can reach the API can read and write owner names',
	'A real database: pets disappear when the program stops',
	'Pagination, CI, fuller OpenAPI docs, coverage gate'
];

export const questions = [
	'Should age and ownerName be required?',
	'Is species free text? “Dog”, “dog” and “DOG” differ today.',
	'Should an owner be its own entity (one owner, several pets)?',
	'Should DELETE on a missing pet return 404 like GET and PUT?',
	'Must duplicates be prevented? Is pagination or filtering needed?'
];

export const flow = ['PetController', 'PetService', 'PetRepository', 'InMemoryPetRepository'];

export const endpoints = [
	{ method: 'POST', path: '/api/pets', note: 'Create a pet (201, relative Location header)' },
	{ method: 'GET', path: '/api/pets', note: 'List all pets, in creation order' },
	{ method: 'GET', path: '/api/pets/{id}', note: 'Fetch a pet' },
	{ method: 'PUT', path: '/api/pets/{id}', note: 'Replace a pet (optional fields left out are cleared)' },
	{ method: 'DELETE', path: '/api/pets/{id}', note: 'Delete a pet (204 even if it does not exist)' }
];

export const errorCodes = [
	{ status: '400', code: 'VALIDATION_FAILED', when: 'Invalid, unknown or wrongly typed field' },
	{ status: '400', code: 'MALFORMED_REQUEST', when: 'Body missing or not valid JSON' },
	{ status: '404', code: 'PET_NOT_FOUND / NOT_FOUND', when: 'No pet with this id / unknown URL' },
	{
		status: '405 / 415',
		code: 'METHOD_NOT_ALLOWED / UNSUPPORTED_MEDIA_TYPE',
		when: 'Method or content type not supported'
	}
];

export const verification = [
	'./mvnw clean verify passes with 78 tests.',
	'The packaged jar was run and checked with curl: create, get, update, delete, 404, field errors, strict parsing, Swagger.',
	'Lombok is not in the jar.'
];
