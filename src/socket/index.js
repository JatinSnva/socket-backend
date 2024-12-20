import cookie from "cookie";
import { SOCKET_EVENT_ENUM } from "../constants.js";

const mountAgentOpenBooking = (socket, io) => {
    return socket.on(SOCKET_EVENT_ENUM.OPEN_BOOKING, (...args) => {
        console.log(args);
        console.log("Fired Open Booking event");
        io.emit(SOCKET_EVENT_ENUM.OPEN_BOOKING, "Hello");
    });
};

const initialiseSocketIO = (io) => {
    return io.on("connection", async (socket) => {
        console.log("A user Connected", socket.id);

        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

        console.log("Cookie:", cookies);

        mountAgentOpenBooking(socket, io);

        socket.on("disconnect", () => {
            console.log("Disconnect user:", socket.id);
        });
    });
};

export { initialiseSocketIO };
