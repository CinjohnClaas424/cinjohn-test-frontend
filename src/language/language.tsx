export type Language = "eng"; // | 'fre';

export interface IMessage {
  availabilityPage: {
    title: string;
  };
  slider: {
    title: string;
  };
}
type Message = {
  [key in Language]: IMessage;
};
const messages: Message = {
  eng: {
    availabilityPage: {
      title: "Availability Selector",
    },
    slider: {
      title: "Select a job length (maximum of 5 hours)",
    },
  },
};

export default messages;
