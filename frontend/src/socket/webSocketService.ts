import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;

  connect(url: string): void {
    this.socket = io(url, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  // Listen for a specific event
  // on(event: string, callback: (message: Message) => void): void {
  //   if (this.socket) {
  //     this.socket.on(event, callback);
  //   }
  // }

  on<T>(event: string, callback: (data: T) => void): void {
    if (this.socket) {
      this.socket.on(event, (data: unknown) => {
        callback(data as T); // Ensure type casting matches the expected type
      });
    } else {
      console.error(`Socket not initialized. Cannot listen for event: ${event}`);
    }
  }
  

  // Emit an event to the server
  emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // Disconnect the socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new WebSocketService();
