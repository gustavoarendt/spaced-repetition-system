import { v4 as uuidV4 } from "uuid";

export default class User {
  id?: string;

  username: string;
  
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
