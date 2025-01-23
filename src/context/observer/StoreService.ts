class StoreService {
  private state: any = undefined;
  private reducer: any = undefined;
  constructor(store: any) {
    this.state = store.state;
    this.reducer = store.reducer;
  }

  DISPATCH = ({ type, payload }: { type: string; payload: any }) => {
    this.state = this.reducer(this.state, { type, payload });
  };

  GET_ALL = () => {
    return this.state;
  };

  GET_STATE = () => {
    return this.state;
  };
}

export { StoreService };
