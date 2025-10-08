import { type ReactElement } from "react";
import { Text } from "@radix-ui/themes";
import { TOKENS } from "./data";
import CustomInput from "./components/custom-input/input";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { useSwap } from "./hooks/useSwap";

export function Swap(): ReactElement {
  const {
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
  } = useSwap();

  return (
    <div className="page">
      <div className="container">
        <Text size="9">Token Swap</Text>
        <div className="swap-container">
          <div className="swap-section">
            <Text className="section-label">From:</Text>
            <CustomInput
              key="from"
              options={TOKENS}
              selectedOption={fromToken}
              onOptionChange={handleFromTokenChange}
              valueInput={fromAmount}
              onValueChange={handleFromAmountChange}
              placeholder="0.00"
              disabledOptions={[toToken]}
              isLoading={isCalculating}
              error={errors.from}
            />
          </div>

          <div className="switch-button-container">
            <button className="switch-button" onClick={handleSwitchTokens}>
              <ArrowDownIcon className="switch-icon" />
            </button>
          </div>

          <div className="swap-section">
            <Text className="section-label">To:</Text>
            <CustomInput
              key="to"
              options={TOKENS}
              selectedOption={toToken}
              onOptionChange={handleToTokenChange}
              valueInput={toAmount}
              onValueChange={handleToAmountChange}
              placeholder="0.00"
              disabledOptions={[fromToken]}
              isLoading={isCalculating}
              error={errors.to}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
