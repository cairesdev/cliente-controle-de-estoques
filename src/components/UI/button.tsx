"use client";
import styles from "@/styles/components/buttons.module.css";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import clsx from "clsx";

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "value" | "onChange"
  > {
  type?: "primary" | "danger" | "success" | "alternative";
  variant?: "solid" | "outline" | "ghost";
  htmlType?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  leading?: ReactNode;
  trailing?: ReactNode;
  block?: boolean;
  rounded?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
  loaderClassName?: string;
}

const Button: FC<ButtonProps> = ({
  type = "primary",
  variant = "solid",
  htmlType = "button",
  size = "md",
  leading,
  trailing,
  loading,
  block,
  rounded,
  disabled,
  iconOnly,
  children,
  className,
  loaderClassName,
  ...restProps
}) => {
  const buttonClass = clsx(
    styles.button,
    styles[variant],
    styles[type],
    {
      [styles[size]]: size,
      [styles.block]: block,
      [styles.rounded]: rounded,
      [styles.iconOnly]: iconOnly,
    },
    className
  );

  return (
    <button
      type={htmlType}
      disabled={loading || disabled}
      className={buttonClass}
      {...restProps}
    >
      {leading && <span className={styles["button-leading"]}>{leading}</span>}
      {children && !iconOnly && (
        <span className={styles["button-content"]}>{children}</span>
      )}
      {trailing && (
        <span className={styles["button-trailing"]}>{trailing}</span>
      )}
      {loading && (
        <span className={clsx(styles["loading-spinner"], loaderClassName)} />
      )}
    </button>
  );
};

export { Button };
