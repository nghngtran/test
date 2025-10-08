import { useRef, useState } from "react";
import { TOKENS } from "../data";

export function useSwap() {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<{ from?: string; to?: string }>({});

  const calculationTimeoutRef = useRef<number | null>(null);

  const validateAmount = (value: string): string | undefined => {
    if (!value || value.trim() === "") return undefined;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "Invalid number";
    if (numValue < 0) return "Amount must be positive";
    if (numValue === 0) return undefined;

    return undefined;
  };

  const calculateToAmount = (
    fromAmt: string,
    fromTok: (typeof TOKENS)[0],
    toTok: (typeof TOKENS)[0]
  ) => {
    if (errors.from || errors.to) return;

    if (!fromAmt || fromAmt.trim() === "" || parseFloat(fromAmt) <= 0) {
      setToAmount("");
    }

    setIsCalculating(true);

    if (calculationTimeoutRef.current) {
      clearTimeout(calculationTimeoutRef.current);
    }

    calculationTimeoutRef.current = setTimeout(() => {
      try {
        const fromValue = parseFloat(fromAmt) * fromTok.price;
        const toValue = fromValue / toTok.price;
        setToAmount(toValue.toFixed(2));
        setErrors((prev) => ({ ...prev, from: undefined }));
      } catch {
        setErrors((prev) => ({ ...prev, from: "Calculation error" }));
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  };

  const calculateFromAmount = (
    toAmt: string,
    fromTok: (typeof TOKENS)[0],
    toTok: (typeof TOKENS)[0]
  ) => {
    if (!toAmt || toAmt.trim() === "" || parseFloat(toAmt) <= 0) {
      setFromAmount("0");
      return;
    }

    setIsCalculating(true);

    if (calculationTimeoutRef.current) {
      clearTimeout(calculationTimeoutRef.current);
    }

    calculationTimeoutRef.current = setTimeout(() => {
      try {
        const toValue = parseFloat(toAmt) * toTok.price;
        const fromValue = toValue / fromTok.price;
        setFromAmount(fromValue.toFixed(2));
        setErrors((prev) => ({ ...prev, to: undefined }));
      } catch {
        setErrors((prev) => ({ ...prev, to: "Calculation error" }));
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  };

  const handleSwitchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    const error = validateAmount(value);
    setErrors((prev) => ({ ...prev, from: error }));

    setFromAmount(value);
    calculateToAmount(value, fromToken, toToken);
  };

  const handleToAmountChange = (value: string) => {
    const error = validateAmount(value);
    setErrors((prev) => ({ ...prev, to: error }));

    setToAmount(value);
    calculateFromAmount(value, fromToken, toToken);
  };

  const handleFromTokenChange = (token: (typeof TOKENS)[0]) => {
    setFromToken(token);
    calculateToAmount(fromAmount, token, toToken);
  };

  const handleToTokenChange = (token: (typeof TOKENS)[0]) => {
    setToToken(token);
    calculateToAmount(fromAmount, fromToken, token);
  };

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    isCalculating,
    errors,
    handleFromAmountChange,
    handleToAmountChange,
    handleFromTokenChange,
    handleToTokenChange,
    handleSwitchTokens,
  };
}
