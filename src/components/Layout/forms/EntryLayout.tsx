// type LayoutConfigStyles<K = "error" | "input"> = {
//   [S in `${K & string}Styles`]: {
//     classNames: string[];
//   };
// };

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface LayoutConfig extends LayoutConfigStyles {}

// export class EntryLayout {
//   constructor(private config: LayoutConfig) {}

//   public generateFields() {
//     return Object.keys(fields).map((key, idx) => {
//       const label = key as keyof ISignUpFormFieldState;
//       return (
//         <div key={idx}>
//           <label className="label">
//             <span className="label-text">{formatLabel(label)}</span>
//           </label>

//           <input
//             type={getTypes(label)}
//             id={label}
//             placeholder={`enter your ${label}`}
//             className="input-bordered input w-full max-w-xs"
//             onChange={handleChange}
//           />

//           {fields[label].err && (
//             <label className="label">
//               <span className="label-text-alt font-medium text-error">
//                 *{fields[label].err}
//               </span>
//             </label>
//           )}
//         </div>
//       );
//     });
//   }
// }
