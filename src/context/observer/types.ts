export interface IUseSelector<V> {
  value: V;
  refreshSelector: () => V;
}
