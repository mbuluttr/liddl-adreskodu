export interface ListProps {
  data: any[];
  title: string;
  onItemPress: (item: any) => void;
  loading: boolean;
  isSearched?: boolean;
}
