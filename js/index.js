import { FrameToFrame, createEvent } from "../../../core/client/client.js";
import { segment } from "oicq";

export const rule = {
  mirageTank: {
    reg: "^#幻影坦克",
    priority: 800,
    describe: "幻影坦克",
  },

};

export async function mirageTank(e) {
  let event = await createEvent(e);
  if (event.imageList.length !== 2) {
    return true;
  }

  let is_color = e.msg.includes("彩色") ? "color" : "";
  console.log(is_color);
  FrameToFrame({
    _package: "mirageTank",
    _handler: "create",
    params: {
      event: event,
      message: is_color,
    },
    onData(error, response) {
      if (error) {
        console.log(error.stack);
      } else {
        e.reply(segment.image(response.image));
      }
    },
  });

  return true;
}