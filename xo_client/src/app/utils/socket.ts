class CustomWebSocket {

    private readonly url: string;
    private websocket: WebSocket;
    private readonly reconnect_delay: number;

    constructor(url: string, reconnect_delay: number) {
        this.url = url;
        this.reconnect_delay = reconnect_delay;
        this.websocket = new WebSocket(url);
        console.log('websocket was created');
        this.connect();
    }

    connect(){
        if (!this.websocket) {
            this.websocket = new WebSocket(this.url);
        }
        this.websocket.onmessage = function (event) {
            if (event.type === 'message'){
                const response = JSON.parse(event.data);

                console.log(response);
                console.log(event);
            }
        };
        this.websocket.onopen = () => {
            console.log('Websocket connection is opening...');
        }
        this.websocket.onerror = event => {
            console.log(event);
            console.log('websocket error');
        }

        this.websocket.onclose = event => {
            console.log(`code ${event.code}`);
            console.log(`reason ${event.reason}`);
            console.log(`wasClean ${event.wasClean}`);
        };
    }

    reconnect(){
        setTimeout(() => {this.connect()}, this.reconnect_delay);
    }

    get_websocket(): WebSocket{
        return this.websocket;
    }
}

export default CustomWebSocket;

export const reconnect_delay = 2000;