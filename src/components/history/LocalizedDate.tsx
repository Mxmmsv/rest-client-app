type LocalizedDateProps = {
  date: Date;
};

export default function LocalizedDate({ date }: LocalizedDateProps) {
  return date.toLocaleString();
}
