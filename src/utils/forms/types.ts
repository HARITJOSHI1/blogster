export interface IForm {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  generateFields?: () => JSX.Element[];
  loadState: {
    loading: boolean;
    text: string;
  }

  btnText: string;
}
