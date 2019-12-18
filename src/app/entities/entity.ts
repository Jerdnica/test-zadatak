interface EntityInterface {
  id: number;
  name: string;
  description: string;
  isConnected: boolean;
}

export class Entity implements EntityInterface {
  id: number;
  name: string;
  description: string;
  isConnected: boolean;

  constructor(id: number, name: string, description: string, isConnected: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isConnected = isConnected;
  }
}
