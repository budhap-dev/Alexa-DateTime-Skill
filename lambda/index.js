const Alexa = require('ask-sdk-core');

const HOW_TO_SPEECH =
  'To add the clock, open the widget gallery on your Echo Show, find Clock, and tap add. ' +
  'On an Echo Show 15 it sits in the widget panel; on smaller Echo Shows, open it from widget ' +
  'shortcuts on the home screen. Tap the clock any time to switch between twelve and ' +
  'twenty-four hour time.';

const HowToHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    if (Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest') return true;
    return (
      request.type === 'IntentRequest' &&
      ['WidgetHowToIntent', 'AMAZON.HelpIntent'].includes(Alexa.getIntentName(handlerInput.requestEnvelope))
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak(HOW_TO_SPEECH).withShouldEndSession(true).getResponse();
  },
};

const GoodbyeHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'AMAZON.NavigateHomeIntent'].includes(
        Alexa.getIntentName(handlerInput.requestEnvelope)
      )
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak('Goodbye.').withShouldEndSession(true).getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent'
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Sorry, I can't help with that. You can ask me how to add the clock widget.")
      .reprompt('Try asking: how do I add the widget?')
      .getResponse();
  },
};

// Data Store Package lifecycle events (install, remove, update, usage). The widget runs
// entirely on the device, so these only need acknowledging.
const DataStoreHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope).startsWith('Alexa.DataStore');
  },
  handle(handlerInput) {
    console.log('DataStore event:', JSON.stringify(handlerInput.requestEnvelope.request));
    return handlerInput.responseBuilder.getResponse();
  },
};

const SessionEndedHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log('Session ended:', JSON.stringify(handlerInput.requestEnvelope.request.reason));
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error('Error handled:', error && error.stack ? error.stack : error);
    return handlerInput.responseBuilder
      .speak('Sorry, something went wrong. Please try again.')
      .reprompt('Please try again.')
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    DataStoreHandler,
    HowToHandler,
    GoodbyeHandler,
    FallbackHandler,
    SessionEndedHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
