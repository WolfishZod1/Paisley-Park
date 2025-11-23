import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  MouseEventHandler,
  UIEvent,
} from "react";
import { motion, useInView } from "framer-motion";
import "./AnimatedList.css";
import HeaderButton from "../buttons/headerButton";
import Done from "../svg/Done";
import api from "@/http/api";
import { makeConfetti } from "../confetti/Confetti";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  type?: string;
  id: number;
  url: string;
  refetchFunc: () => void;
}

const finishTaskHandler = (refetch: () => void, id: number) => {
  try {
    api.post("/task-completion", { taskId: id }).then((res) => {
      if (res.data === "DONE ALREADY") {
        return;
      } else {
        refetch();
        makeConfetti();
        toast.success("Поздравляем!", {
          id: String(id),
          style: {
            backgroundColor: "rgba(180, 0, 0, 0.55)",
            outline: "2px solid #941d3a",
            color: "white",
            backdropFilter: "blur(2px)",
          },
        });
      }
    });
  } catch (error) {}
};

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
  type,
  id,
  url,
  refetchFunc,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ marginBottom: "1rem", cursor: "pointer" }}
    >
      {children}

      {type === "MENTOR" && (
        <HeaderButton
          onClick={() => finishTaskHandler(refetchFunc, id)}
          needAnimate={true}
          text="Выполнить"
        >
          <Done className="done_svg" onClick={() => {}} />
        </HeaderButton>
      )}
    </motion.div>
  );
};

interface Item {
  label: string;
  type?: string;
  desc: string;
  id: number;
  url: string;
}

interface AnimatedListProps {
  items?: Item[];
  onItemSelect?: (item: Item, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  refetchFunc: () => void;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  items = [],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  displayScrollbar = true,
  initialSelectedIndex = -1,
  refetchFunc,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] =
    useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`
    ) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  const router = useRouter();

  return (
    <div className={`scroll-list-container ${className}`}>
      <div
        ref={listRef}
        className={`scroll-list ${!displayScrollbar ? "no-scrollbar" : ""}`}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <AnimatedItem
            refetchFunc={refetchFunc}
            id={item.id}
            key={index}
            delay={0.1}
            index={index}
            type={item.type}
            url={item.url}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              if (onItemSelect) {
                onItemSelect(item, index);
              }
              router.push(item.url);
            }}
          >
            <div
              className={`item ${
                selectedIndex === index ? "selected" : ""
              } ${itemClassName}`}
            >
              <p className="item-text">{item.label}</p>
              <h5 style={{ color: "white", marginTop: 10 }}>{item.desc}</h5>
            </div>
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div
            className="top-gradient"
            style={{ opacity: topGradientOpacity }}
          ></div>
          <div
            className="bottom-gradient"
            style={{ opacity: bottomGradientOpacity }}
          ></div>
        </>
      )}
    </div>
  );
};

export default AnimatedList;
