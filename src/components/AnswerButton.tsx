interface AnswerButtonProps {
  text: string;
  onClick: () => void;
  state: 'default' | 'selected' | 'correct' | 'incorrect';
  disabled: boolean;
}

export function AnswerButton({ text, onClick, state, disabled }: AnswerButtonProps) {
  const getStateClasses = (): string => {
    const baseClasses = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 font-medium";

    switch (state) {
      case 'correct':
        return `${baseClasses} bg-green-900 border-green-500 text-green-100`;
      case 'incorrect':
        return `${baseClasses} bg-red-900 border-red-500 text-red-100`;
      case 'selected':
        return `${baseClasses} bg-orange-900 border-orange-500 text-orange-100`;
      default:
        return `${baseClasses} bg-gray-700 border-orange-500 text-orange-100 hover:border-orange-400 hover:bg-gray-600 active:scale-[0.98] cursor-pointer`;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getStateClasses()}
    >
      {text}
    </button>
  );
}
