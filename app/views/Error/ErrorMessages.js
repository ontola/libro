import HttpStatus from 'http-status-codes';

const CLIENT_CLOSED_REQUEST = 499;

export const errors = {
  en: {
    [HttpStatus.BAD_REQUEST]: {
      body: 'The request made cannot be fulfilled because it contains bad syntax, check your URL parameters or refresh the page that linked to this resource.',
      header: 'Bad request (400 Bad Request)',
    },
    [HttpStatus.UNAUTHORIZED]: {
      body: 'You have to be logged in to view this resource.',
      header: 'Unauthorized',
    },
    [HttpStatus.FORBIDDEN]: {
      body: "Maybe it's visible after logging in.",
      header: 'This item is hidden',
    },
    [HttpStatus.NOT_FOUND]: {
      body: 'Maybe the item you are looking for is deleted or never existed.',
      header: 'This item is not found',
    },
    [HttpStatus.NOT_ACCEPTABLE]: {
      body: 'This resource cannot be viewed in the current format.',
      header: 'Not acceptable',
    },
    [HttpStatus.REQUEST_TIMEOUT]: {
      body: 'The request took too long, refresh the page or try again later.',
      header: 'Request timeout',
    },
    [HttpStatus.CONFLICT]: {
      body: 'The change could not be persisted because the resource was edited since it was opened locally.',
      header: 'Conflict',
    },
    [HttpStatus.GONE]: {
      body: 'The resource has been deleted permanently.',
      header: 'Gone',
    },
    [HttpStatus.REQUEST_TOO_LONG]: {
      body: 'The item that you are uploading is too large. Go back and try a smaller file.',
      header: 'Request entity too large (413 Payload Too Large)',
    },
    [HttpStatus.UNPROCESSABLE_ENTITY]: {
      body: 'The item that you are trying to create cannot be processed.',
      header: 'Unprocessable Entity',
    },
    [HttpStatus.TOO_MANY_REQUESTS]: {
      body: 'Je maakt te veel verzoeken, probeer het over halve minuut nog eens.',
      header: 'Too many requests',
    },
    [HttpStatus.INTERNAL_SERVER_ERROR]: {
      body: 'Er ging iets aan onze kant fout, probeer het later nog eens.',
      header: 'Internal server error',
    },
    [HttpStatus.NOT_IMPLEMENTED]: {
      body: "This feature isn't implemented, please try again later.",
      header: 'Not implemented',
    },
    [HttpStatus.BAD_GATEWAY]: {
      body: 'There was a networking issue during this request, please retry or try again later',
      header: 'Bad gateway',
    },
    [HttpStatus.SERVICE_UNAVAILABLE]: {
      body: 'There was a networking issue during this request, please retry or try again later',
      header: 'Service unavailable',
    },
    [HttpStatus.GATEWAY_TIMEOUT]: {
      body: 'There was a networking issue during this request, please retry or try again later',
      header: 'Gateway timeout',
    },
    [CLIENT_CLOSED_REQUEST]: {
      body: 'There was a (network) issue during this request, check the internet connection, please retry or try a different browser.',
      header: 'Problem with the browser',
    },
    again: 'Try again',
    click_to_retry: 'Click to retry',
    error: 'Error',
    let_us_know: 'Let us know.',
    mistaken: 'Is this an error?',
  },
  nl: {
    [HttpStatus.BAD_REQUEST]: {
      body: 'Het verzoek bevat een fout waardoor deze niet verwerkt kan worden, check de URL parameters en probeer de pagina welke naar deze verwees te herladen.',
      header: 'Fout in het verzoek (400 Bad Request)',
    },
    [HttpStatus.UNAUTHORIZED]: {
      body: 'Je moet ingelogd zijn om dit te kunnen zien.',
      header: 'Niet ingelogt',
    },
    [HttpStatus.FORBIDDEN]: {
      body: 'Mogelijk is het zichtbaar na te hebben ingelogt.',
      header: 'Dit item is verborgen',
    },
    [HttpStatus.NOT_FOUND]: {
      body: 'Misschien is het item dat je zoekt verwijderd of heeft het nooit bestaan.',
      header: 'Dit item is niet gevonden',
    },
    [HttpStatus.NOT_ACCEPTABLE]: {
      body: 'Dit resource kan niet bekeken worden in dit formaat.',
      header: 'Niet accepteerbaar',
    },
    [HttpStatus.REQUEST_TIMEOUT]: {
      body: 'Het verzoek duurde te lang, probeer het opnieuw of later nog eens.',
      header: 'Verzoek stilgevallen',
    },
    [HttpStatus.CONFLICT]: {
      body: 'De verandering kon niet worden doorgevoerd omdat het item bewerkt is sinds deze lokaal was geopend.',
      header: 'Conflict',
    },
    [HttpStatus.GONE]: {
      body: 'Dit item is permanent verwijderd.',
      header: 'Item verwijderd',
    },
    [HttpStatus.REQUEST_TOO_LONG]: {
      body: 'Het item dat je probeert te verzenden is te groot. Ga terug en probeer een kleiner bestand.',
      header: 'Verzoek te groot',
    },
    [HttpStatus.UNPROCESSABLE_ENTITY]: {
      body: 'Het item dat je probeert aan te maken kan niet worden verwerkt.',
      header: 'Het item kan niet worden verwerkt',
    },
    [HttpStatus.TOO_MANY_REQUESTS]: {
      body: 'Je maakt te veel verzoeken, probeer het over halve minuut nog eens.',
      header: 'Te veel verzoeken',
    },
    [HttpStatus.INTERNAL_SERVER_ERROR]: {
      body: 'Er ging iets aan onze kant fout, probeer het later nog eens.',
      header: 'Interne serverfout',
    },
    [HttpStatus.NOT_IMPLEMENTED]: {
      body: 'Deze functionaliteit is niet geïmplementeerd, probeer het later nog eens.',
      header: 'Niet geïmplementeerd',
    },
    [HttpStatus.BAD_GATEWAY]: {
      body: 'Er was een netwerkprobleem voor dit verzoek, probeer het opnieuw of later nog eens.',
      header: 'Slechte doorgang',
    },
    [HttpStatus.SERVICE_UNAVAILABLE]: {
      body: 'Er was een netwerkprobleem voor dit verzoek, probeer het opnieuw of later nog eens.',
      header: 'Service niet beschikbaar',
    },
    [HttpStatus.GATEWAY_TIMEOUT]: {
      body: 'Er was een netwerkprobleem voor dit verzoek, probeer het opnieuw of later nog eens.',
      header: 'Doorgang stilgevallen',
    },
    [CLIENT_CLOSED_REQUEST]: {
      body: 'Er was een (netwerk) probleem voor dit verzoek, controleer de internet verbinding, probeer het later nog eens of in een andere browser.',
      header: 'Probleem met de browser',
    },
    again: 'Opnieuw',
    click_to_retry: 'Klik om het nogmaals te proberen.',
    error: 'Fout',
    let_us_know: 'Laat het ons weten.',
    mistaken: 'Is dit een fout?',
  },
};

export function bodyForStatus(requestStatus, lang = 'nl') {
  if (!requestStatus.requested) {
    return null;
  }
  const err = errors[lang][requestStatus.status];
  return err ? err.body : null;
}

export function headerForStatus(requestStatus, lang = 'nl') {
  if (!requestStatus.requested) {
    return null;
  }
  const err = errors[lang][requestStatus.status];
  return err ? err.header : null;
}

export function titleForStatus(requestStatus, lang = 'nl') {
  if (!requestStatus || !requestStatus.requested) {
    return null;
  }
  const err = errors[lang][requestStatus.status];
  return !err ? null : `${err.header} - ${errors[lang][requestStatus.status].body}`;
}
