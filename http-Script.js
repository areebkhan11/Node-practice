
// The following modules are supported:
//
// $fs      =>   https://github.com/jprichardson/node-fs-extra
// $h       =>   https://github.com/mkloubert/vscode-helpers
// $moment  =>   https://github.com/moment/moment
// $uuid    =>   https://github.com/kelektiv/node-uuid
// $vs      =>   https://code.visualstudio.com/docs/extensionAPI/vscode-api

const CURRENT_TIME = now();
const CURRENT_UTC_TIME = utc();

const SESSION_ID = $uuid.v4();
const USERS = [ 1, 2, 3 ];

for (let i = 0; i < USERS.length; i++) {
    if (cancel.isCancellationRequested) {
        break;  // user wants to cancel
    }

    const USER_ID = USERS[i];

    // update progress
    progress.report({
        message: `Execute request for user ${ i + 1 } (ID ${ USER_ID }) of ${ USERS.length }`,
        increment: 1.0 / USERS.length * 100.0
    });

    // create new request
    // s. https://mkloubert.github.io/vscode-http-client/classes/_http_.httpclient.html
    const REQUEST = new_request();

    // set custom query / URL parameter(s)
    REQUEST.param('user', USER_ID)
           .param('foo', 'bar');

    // set custom header(s)
    REQUEST.header('X-MyApp-Session', SESSION_ID)
           .header('X-MyApp-Time', CURRENT_UTC_TIME.format('YYYY-MM-DD HH:mm:ss'));

    // set custom body from a file, e.g.
    REQUEST.body({
        name: 'INam'
    });

    // build and the send request
    //
    // httpResult.response  =>  the object with the response data
    let httpResult;
    try {
        httpResult = await REQUEST.send();
    } catch (e) {
        // send error
    }

    // wait about 1.5 seconds
    await sleep( 1.5 );
}
