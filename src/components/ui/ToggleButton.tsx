import React from "react";

type Props = {
  toggle: boolean;
  onToggle: (toggle: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

export default function ToggleButton({ toggle, onToggle, onIcon, offIcon }: Props) {
  return <button onClick={() => onToggle(!toggle)}>{toggle ? onIcon : offIcon}</button>;
}
