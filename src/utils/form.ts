export interface IForm {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>)=> void 
    loading: boolean;
}