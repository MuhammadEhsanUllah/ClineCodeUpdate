import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import CTASection from "@/components/cta-section";
// import { FaBolt } from "react-icons/fa";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
// import {
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
  features: string[];
}
interface OpenItems {
  [key: number]: boolean;
}
export default function Gates() {
  // Canvas reference and gate configuration state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [basePrice, setBasePrice] = useState(1998);
  const [totalPrice, setTotalPrice] = useState(1998);

  // Gate configuration options
  const [width, setWidth] = useState(155); // feet
  const [height, setHeight] = useState(20); // feet
  const [kitType, setKitType] = useState("swing");
  const [panels, setPanels] = useState("double");
  const [style, setStyle] = useState("arch");
  const [pickets, setPickets] = useState("solo");
  const [ironwood, setIronwood] = useState("none");
  const [access, setAccess] = useState("manual");

  // Price adjustments
  const [kitPrice, setKitPrice] = useState(500);
  const [panelsPrice, setPanelsPrice] = useState(0);
  const [stylePrice, setStylePrice] = useState(266);
  const [picketsPrice, setPicketsPrice] = useState(532);
  const [ironwoodPrice, setIronwoodPrice] = useState(0);
  const [accessPrice, setAccessPrice] = useState(75);
  const [openItems, setOpenItems] = useState<OpenItems>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

  //   const handleOpen = (value: number) => {
  //     setOpenItems((prev) => ({
  //       ...prev,
  //       [value]: !prev[value], // Toggle only the clicked item
  //     }));
  //   };

  // Calculate total weight - for demo purposes
  const weight = 269; // lbs
  let ctx: any = null;
  let canvas: any = null;
  //new code
  // const canvas = canvasRef.current;
  // if (!canvas) return;
  // const ctx = canvas.getContext("2d");
  // if (!ctx) return;
  // // Update total price when configurations change
  useEffect(() => {
    const price =
      basePrice +
      kitPrice +
      panelsPrice +
      stylePrice +
      picketsPrice +
      ironwoodPrice +
      accessPrice;
    setTotalPrice(price);
  }, [
    basePrice,
    kitPrice,
    panelsPrice,
    stylePrice,
    picketsPrice,
    ironwoodPrice,
    accessPrice,
  ]);

  // Draw gate on canvas
  useEffect(() => {
    canvas = canvasRef.current;
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas dimensions
    canvas.width = 1100;
    canvas.height = 500;

    // for testing
    handleOpen(5);
    setBasePrice(5000);

    // Draw gate based on configuration
    drawGate();
    allHandlers();
  }, [width, height, kitType, panels, style, pickets, ironwood, access]);

  // Ensure openItems state is properly updated and used
  const handleOpen = (value: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [value]: !prev[value], // Toggle only the clicked item
    }));
  };

  const drawArrowFinial = (x: number, y: number): void => {
    ctx.beginPath();
    ctx.moveTo(x, y - 8);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.lineWidth = 2;
  };

  const drawHorizontalIronwood = (
    startX: number,
    width: number,
    topY: number,
    bottomY: number,
    showArch: boolean
  ): void => {
    // Save current drawing style
    ctx.save();

    // Create clipping path for arch shape if needed
    if (showArch) {
      ctx.beginPath();
      ctx.moveTo(startX, bottomY);

      // Create arch shape
      const archPoints = [];
      const pointCount = 20; // Number of points to create smooth arch

      for (let i = 0; i <= pointCount; i++) {
        const offset = i / pointCount;
        const x = startX + width * offset;
        const archHeight = 30 * Math.sin(Math.PI * offset);
        const y = topY + (30 - archHeight);
        archPoints.push({ x, y });
      }

      // Draw the arch
      for (let i = 0; i < archPoints.length; i++) {
        ctx.lineTo(archPoints[i].x, archPoints[i].y);
      }

      ctx.lineTo(startX + width, bottomY);
      ctx.closePath();
      ctx.clip(); // Set clipping region to arch shape
    }

    // Fill with a wood-like background color
    ctx.fillStyle = "#BC9055"; // Light wood color
    ctx.fillRect(startX, topY, width, bottomY - topY);

    // Draw horizontal lines with measurements
    const lineSpacing = 30; // Space between horizontal lines
    const lineCount = Math.floor((bottomY - topY) / lineSpacing);

    // Draw the horizontal lines
    ctx.strokeStyle = "#ffffff"; // White lines
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]); // Dashed lines

    for (let i = 0; i <= lineCount; i++) {
      const y = topY + i * lineSpacing;

      // Skip lines that would be above the arch
      if (showArch) {
        const offset = 0.5; // Middle of the gate
        const archHeight = 30 * Math.sin(Math.PI * offset);
        const minY = topY + (30 - archHeight);
        if (y < minY) continue;
      }

      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + width, y);
      ctx.stroke();
    }

    // Restore original drawing style (removes clipping)
    ctx.restore();
  };

  const drawVerticalIronwood = (
    startX: number,
    width: number,
    topY: number,
    bottomY: number,
    showArch: boolean
  ): void => {
    ctx.save();

    ctx.fillStyle = "#BC9055"; // Light wood color

    // Create background path
    ctx.beginPath();
    ctx.moveTo(startX, bottomY);

    if (showArch) {
      // Create arch shape for background
      const archPoints = [];
      const pointCount = 20; // Number of points to create smooth arch

      for (let i = 0; i <= pointCount; i++) {
        const offset = i / pointCount;
        const x = startX + width * offset;
        const archHeight = 30 * Math.sin(Math.PI * offset);
        const y = topY + (30 - archHeight);
        archPoints.push({ x, y });
      }

      // Draw the arch
      for (let i = 0; i < archPoints.length; i++) {
        ctx.lineTo(archPoints[i].x, archPoints[i].y);
      }
    } else {
      // Straight top
      ctx.lineTo(startX, topY);
      ctx.lineTo(startX + width, topY);
    }

    ctx.lineTo(startX + width, bottomY);
    ctx.closePath();
    ctx.fill();

    // Draw vertical lines with measurements
    const lineSpacing = 30;
    const lineCount = Math.floor(width / lineSpacing);

    // Draw the vertical lines
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);

    for (let i = 0; i <= lineCount; i++) {
      const x = startX + i * lineSpacing;
      ctx.beginPath();

      if (showArch) {
        // Follow arch shape for vertical lines
        const offset = (i * lineSpacing) / width;
        const archHeight = 30 * Math.sin(Math.PI * offset);
        const lineTop = topY + (30 - archHeight);
        ctx.moveTo(x, lineTop);
      } else {
        // Straight top
        ctx.moveTo(x, topY);
      }

      ctx.lineTo(x, bottomY);
      ctx.stroke();
    }

    // Restore original drawing style
    ctx.restore();
  };

  const drawPanel = (
    startX: number,
    picketCount: number,
    picketGap: number,
    topY: number,
    bottomY: number,
    showArch: boolean,
    showFinials: boolean
  ): void => {
    const panelWidth = (picketCount - 1) * picketGap;
    const topPoints = [];
    console.log(
      "drawPanel",
      startX,
      picketCount,
      picketGap,
      topY,
      bottomY,
      showFinials
    );
    // const picketType = kitType;
    // const ironwoodType = document.querySelector(
    //   'input[name="ironwoodType"]:checked'
    // ).value;

    // const gateType = document.querySelector(
    //   'input[name="gateType"]:checked'
    // ).value;

    // let lastIndexVal = 0;
    // this calcultate gatewidth and convert to feet and inches
    // const gateWidth = parseInt(document.getElementById("widthSlider").value);
    const widthInFeet = getWidthInFeetAndInches();
    const numericFeet = parseInt(widthInFeet.split("'")[0]);

    if (pickets === "double") {
      picketGap = 10;
      picketCount = picketCount * 2 - 1;
    }

    for (let i = 0; i < picketCount; i++) {
      const offset = i / (picketCount - 1);
      let x = startX + i * picketGap;
      const archHeight = 30 * Math.sin(Math.PI * offset);
      let picketTop = showArch ? topY + (30 - archHeight) : topY;
      if (pickets == "none") {
        if (i == 0 || i == picketCount - 1) {
          ctx.lineWidth = 5;
        }
      } else {
        ctx.lineWidth = 2;
      }

      if (pickets !== "none") {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, picketTop);
        ctx.lineTo(x, bottomY - 40);
        ctx.stroke();
      }

      ctx.beginPath();

      ctx.moveTo(x, picketTop);
      ctx.lineTo(x, bottomY - 40);
      if (pickets !== "none") {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        if (i == 0 || i == picketCount - 1) {
          ctx.strokeStyle = "black";
          ctx.lineWidth = 5;
        }
      } else {
        if (i == 0 || i == picketCount - 1) {
          ctx.strokeStyle = "black";
        } else {
          if (ironwood == "horizontal" || ironwood == "vertical") {
            ctx.strokeStyle = "#BC9055";
          } else {
            ctx.strokeStyle = "white";
          }
        }
      }
      ctx.stroke();
      ctx.strokeStyle = "black";

      if (style == "finials" || style == "both") {
        drawArrowFinial(x, picketTop);
      }

      topPoints.push({ x, y: picketTop + 2 });
      // IF the half gate is made just brake the loop
      if (panels === "double") {
        if (i == Math.floor(picketCount / 2)) {
          break;
        }
      }
    }

    if (pickets === "puppy") {
      picketGap = 10;
      picketCount = picketCount * 2 - 1;
    }
    const centerIndex = Math.floor(picketCount / 2);
    const centerX = startX + centerIndex * picketGap;

    // center lines on top side and put here codition of double gate
    ctx.lineWidth = 5;
    ctx.beginPath();

    //dual gate
    ctx.beginPath();
    ctx.moveTo(centerX, topY);
    ctx.lineTo(centerX, bottomY - 40);
    ctx.stroke();
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.lineWidth = 5;
    for (let i = 0; i < topPoints.length - 1; i++) {
      ctx.moveTo(topPoints[i].x, topPoints[i].y);
      ctx.lineTo(topPoints[i + 1].x, topPoints[i + 1].y);
    }
    ctx.stroke();

    // draw the bottom rectangle and devide if double gate
    ctx.beginPath();
    ctx.moveTo(startX, bottomY - 40);
    ctx.lineTo(startX + panelWidth, bottomY - 40);
    ctx.lineTo(startX + panelWidth, bottomY);
    ctx.lineTo(startX, bottomY);
    ctx.closePath();
    ctx.stroke();

    // condition for double gate
    if (panels == "double") {
      ctx.beginPath();
      ctx.moveTo(startX, bottomY - 40);
      ctx.lineTo(startX + panelWidth / 2, bottomY - 40);
      ctx.lineTo(startX + panelWidth / 2, bottomY);
      ctx.lineTo(startX, bottomY);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.beginPath();
    for (let i = 0; i < picketCount; i++) {
      const x = startX + i * picketGap;
      ctx.beginPath();

      if (
        numericFeet >= 10 ||
        (numericFeet >= 10 && ironwood == "horizontal") ||
        (ironwood == "diy" && numericFeet >= 10)
      ) {
        // Check if width is around 10 feet
        const halfPanelWidth = ((picketCount - 1) * picketGap) / 2;
        const leftCenterX = startX + halfPanelWidth / 2;
        const rightCenterX = startX + halfPanelWidth + halfPanelWidth / 2;

        // Draw left center lines
        ctx.lineWidth = 5;
        ctx.beginPath();

        ctx.beginPath();
        let topYx = showArch ? topY + 10 : topY;
        ctx.moveTo(leftCenterX, topYx);
        ctx.lineTo(leftCenterX, bottomY);
        ctx.stroke();

        // Draw right center lines
        ctx.beginPath();
        let topYz = showArch ? topY + 10 : topY;
        ctx.moveTo(rightCenterX, topYz);
        ctx.lineTo(rightCenterX, bottomY);
        ctx.stroke();
        ctx.lineWidth = 2;
      }
      // If gate is double,dont draw the center lines
      if (i === centerIndex) {
        ctx.lineWidth = 5;
        ctx.moveTo(x, bottomY - 40);
        ctx.lineTo(x, bottomY);
        ctx.stroke();
        ctx.lineWidth = 2;
      } else {
        if (pickets === "none") continue;
        ctx.lineWidth = 2;
        ctx.moveTo(x, bottomY - 40);
        ctx.lineTo(x, bottomY);
        ctx.stroke();
      }
      if (panels === "double") {
        if (i == centerIndex) {
          break;
        }
      }
    }

    // const kitType = document.querySelector(
    //   'input[name="kitType"]:checked'
    // ).value;
    if (kitType === "swing") {
      if (showArch != true) {
        drawHinges(startX, topY - 30, bottomY, startX + panelWidth + 25);
      } else {
        drawHinges(startX, topY, bottomY, startX + panelWidth + 25);
      }
    } else if (kitType === "slider") {
      if (showArch != true) {
        drawWheels(startX, topY - 30, panelWidth, bottomY, panelWidth);
      } else {
        drawWheels(startX, topY - 30, panelWidth, bottomY, panelWidth);
      }
    }

    // If gate width is 10 feet, split the center stroke
    if (
      numericFeet >= 10 ||
      (numericFeet >= 10 && ironwood == "horizontal") ||
      (ironwood == "diy" && numericFeet >= 10)
    ) {
      //   const halfPanelWidth = panelWidth / 2;
      //   const leftCenterX = startX + halfPanelWidth / 2;
      //   const rightCenterX = startX + halfPanelWidth + halfPanelWidth / 2;
    }
  };

  const getArcHeight = (): number => {
    return height;
  };

  const convertPointsToFeet = (arcHeightValue: number): number => {
    return 3 + ((arcHeightValue - 3) * (6 - 3)) / (39 - 3); // Map points 3-39 to 3-6 feet
  };

  const getTopY = (): number => {
    const arcHeightValue = getArcHeight();
    const feetValue = convertPointsToFeet(arcHeightValue);
    getHeightInFeetAndInches();
    return 200 - ((feetValue - 3) * (200 - 100)) / (6 - 3);
  };

  const getHeightInFeetAndInches = (): string => {
    const arcHeightValue = getArcHeight();
    const totalFeet = 3 + ((arcHeightValue - 3) * (6 - 3)) / (39 - 3);
    const feet = Math.floor(totalFeet);
    const inches = Math.round((totalFeet - feet) * 12);
    console.log(`Feet: ${feet}, Inches: ${inches}`);
    return `${feet}' ${inches}"`;
  };

  const getWidthInFeetAndInches = (): string => {
    // const widthValue = parseInt(document.getElementById("widthSlider").value);
    const totalFeet = 3 + ((width - 155) * (20 - 3)) / (900 - 155);
    const feet = Math.floor(totalFeet);
    const inches = Math.round((totalFeet - feet) * 12);
    console.log(`Width: ${feet} feet ${inches} inches`);
    return `${feet}' ${inches}"`;
  };

  const drawHinges = (
    startX: number,
    topY: number,
    bottomY: number,
    panelWidth: number
  ): void => {
    // const gateType = document.querySelector(
    //   'input[name="gateType"]:checked'
    // ).value;
    ctx.save();

    const pillarWidth = 10;
    const pillarHeight = bottomY - topY - 20;
    const roundedTopRadius = pillarWidth / 2;

    // LEFT PILLAR with rounded top
    ctx.beginPath();
    ctx.fillStyle = "#000";
    if (panels === "solo") {
      ctx.arc(
        panelWidth - 20 + roundedTopRadius, // centerX
        topY + 25 + roundedTopRadius, // centerY
        roundedTopRadius,
        Math.PI,
        2 * Math.PI
      );

      // Draw rest of the pillar as a rectangle below
      ctx.rect(
        panelWidth - 20,
        topY + 25 + roundedTopRadius,
        pillarWidth,
        pillarHeight - roundedTopRadius
      );
    }
    ctx.arc(
      startX - pillarWidth - 10 + roundedTopRadius, // centerX
      topY + 25 + roundedTopRadius, // centerY
      roundedTopRadius,
      Math.PI,
      2 * Math.PI
    );

    // Draw rest of the pillar as a rectangle below
    ctx.rect(
      startX - pillarWidth - 10,
      topY + 25 + roundedTopRadius,
      pillarWidth,
      pillarHeight - roundedTopRadius
    );
    // Draw rounded top

    ctx.fill();

    // Draw Hinges on LEFT PILLAR
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;

    const hingeSpacing = bottomY - topY - 40;

    // Top Hinge (20% down from the top)
    const topHingeY = topY + 20 + hingeSpacing * 0.25;
    ctx.fillStyle = "black";
    ctx.fillRect(startX - pillarWidth - 5, topHingeY - 5, 15, 10);
    ctx.beginPath();
    ctx.fillStyle = "#555";
    ctx.fill();

    // Bottom Hinge (20% up from the bottom)
    const bottomHingeY = topY + 20 + hingeSpacing * 1;
    ctx.fillStyle = "black";
    ctx.fillRect(startX - pillarWidth - 5, bottomHingeY - 5, 15, 10);
    ctx.beginPath();
    ctx.fillStyle = "#555";
    ctx.fill();

    ctx.restore();
  };

  const drawWheels = (
    startX: number,
    topY: number,
    width: number,
    bottomY: number,
    panelWidth: number
  ): void => {
    // const gateType = document.querySelector(
    //   'input[name="gateType"]:checked'
    // ).value;
    ctx.save();
    const pillarWidth = 10;
    const pillarHeight = bottomY - topY - 20;
    const roundedTopRadius = pillarWidth / 2;

    // LEFT PILLAR with rounded top
    ctx.beginPath();
    ctx.fillStyle = "#000";
    if (panels === "solo") {
      ctx.arc(
        startX + panelWidth + roundedTopRadius, // centerX
        topY + 25 + roundedTopRadius, // centerY
        roundedTopRadius,
        Math.PI,
        2 * Math.PI
      );

      // Draw rest of the pillar as a rectangle below
      ctx.rect(
        startX + panelWidth,
        topY + 25 + roundedTopRadius,
        pillarWidth,
        pillarHeight - roundedTopRadius
      );
    }
    // Draw rounded top
    ctx.arc(
      startX - pillarWidth + roundedTopRadius, // centerX
      topY + 25 + roundedTopRadius, // centerY
      roundedTopRadius,
      Math.PI,
      2 * Math.PI
    );

    // Draw rest of the pillar as a rectangle below
    ctx.rect(
      startX - pillarWidth,
      topY + 25 + roundedTopRadius,
      pillarWidth,
      pillarHeight - roundedTopRadius
    );

    ctx.fill();

    // Draw Hinges on LEFT PILLAR
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;

    const wheelRadius = 7;
    const wheelY = bottomY + wheelRadius;

    // Left Wheel
    const leftWheelX = startX + width * 0.1;
    ctx.beginPath();
    ctx.arc(leftWheelX, wheelY, wheelRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#555";
    ctx.fill();

    // Wheel detail
    ctx.beginPath();
    ctx.arc(leftWheelX, wheelY, wheelRadius * 0.7, 0, Math.PI * 2);
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (panels === "double") {
      // second wheel on left side
      const leftWheelX2 = startX + width * 0.4;
      ctx.beginPath();
      ctx.arc(leftWheelX2, wheelY, wheelRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#555";
      ctx.fill();

      // Wheel detail
      ctx.beginPath();
      ctx.arc(leftWheelX2, wheelY, wheelRadius * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = "#999";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      // Right Wheel
      const rightWheelX = startX + width * 0.9;
      ctx.beginPath();
      ctx.arc(rightWheelX, wheelY, wheelRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#555";
      ctx.fill();

      // Wheel detail
      ctx.beginPath();
      ctx.arc(rightWheelX, wheelY, wheelRadius * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = "#999";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawPanelDouble = (
    startX: number,
    picketCount: number,
    picketGap: number,
    topY: number,
    bottomY: number,
    showArch: boolean,
    showFinials: boolean
  ): void => {
    const panelWidth = (picketCount - 1) * picketGap;
    const topPoints = [];
    // const pickets = kitType;
    // const ironwoodType = document.querySelector(
    //   'input[name="ironwoodType"]:checked'
    // ).value;

    // const gateType = document.querySelector(
    //   'input[name="gateType"]:checked'
    // ).value;

    // let lastIndexVal = 0;
    // this calcultate gatewidth and convert to feet and inches
    // const gateWidth = parseInt(document.getElementById("widthSlider").value);
    const widthInFeet = getWidthInFeetAndInches();
    const numericFeet = parseInt(widthInFeet.split("'")[0]);

    if (pickets === "double") {
      picketGap = 10;
      picketCount = picketCount * 2 - 1;
    }

    for (let i = 0; i < picketCount; i++) {
      const offset = i / (picketCount - 1);
      let x = startX + i * picketGap;
      const archHeight = 30 * Math.sin(Math.PI * offset);
      let picketTop = showArch ? topY + (30 - archHeight) : topY;
      if (pickets == "none") {
        if (i == 0 || i == picketCount - 1) {
          ctx.lineWidth = 5;
        }
      } else {
        ctx.lineWidth = 2;
      }

      if (pickets !== "none") {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, picketTop);
        ctx.lineTo(x, bottomY - 40);
        ctx.stroke();
      }

      ctx.beginPath();

      ctx.moveTo(x, picketTop);
      ctx.lineTo(x, bottomY - 40);
      if (pickets !== "none") {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        if (i == 0 || i == picketCount - 1) {
          ctx.strokeStyle = "black";
          ctx.lineWidth = 5;
        }
      } else {
        if (i == 0 || i == picketCount - 1) {
          ctx.strokeStyle = "black";
        } else {
          if (ironwood == "horizontal" || ironwood == "vertical") {
            ctx.strokeStyle = "#BC9055";
          } else {
            ctx.strokeStyle = "white";
          }
        }
      }
      ctx.stroke();
      ctx.strokeStyle = "black";

      if (showFinials) {
        drawArrowFinial(x, picketTop);
      }

      topPoints.push({ x, y: picketTop + 2 });
      // IF the half gate is made just brake the loop
      if (i == Math.floor(picketCount / 2)) {
        break;
      }
    }

    if (pickets === "puppy") {
      picketGap = 10;
      picketCount = picketCount * 2 - 1;
    }
    const centerIndex = Math.floor(picketCount / 2);
    const centerX = startX + centerIndex * picketGap;

    // center lines on top side and put here codition of double gate
    ctx.lineWidth = 5;
    ctx.beginPath();

    //dual gate
    ctx.beginPath();
    ctx.moveTo(centerX, topY);
    ctx.lineTo(centerX, bottomY - 40);
    ctx.stroke();
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.lineWidth = 5;
    for (let i = 0; i < topPoints.length - 1; i++) {
      ctx.moveTo(topPoints[i].x, topPoints[i].y);
      ctx.lineTo(topPoints[i + 1].x, topPoints[i + 1].y);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(startX, bottomY - 40);
    ctx.lineTo(startX, bottomY);
    ctx.lineTo(startX + panelWidth / 2, bottomY);
    ctx.lineTo(startX + panelWidth / 2, bottomY - 40);
    if (pickets !== "none") {
      ctx.closePath();
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < picketCount; i++) {
      const x = startX + i * picketGap;
      ctx.beginPath();

      if (
        numericFeet >= 10 ||
        (numericFeet >= 10 && ironwood == "horizontal") ||
        (ironwood == "diy" && numericFeet >= 10)
      ) {
        // Check if width is around 10 feet
        const halfPanelWidth = ((picketCount - 1) * picketGap) / 2;
        const leftCenterX = startX + halfPanelWidth / 2;
        // const rightCenterX = startX + halfPanelWidth + halfPanelWidth / 2;

        // Draw left center lines
        ctx.lineWidth = 5;
        ctx.beginPath();

        ctx.beginPath();
        let topYx = showArch ? topY + 10 : topY;
        ctx.moveTo(leftCenterX, topYx);
        ctx.lineTo(leftCenterX, bottomY);
        ctx.stroke();
      }
      // If gate is double,dont draw the center lines
      if (i === centerIndex) {
        ctx.lineWidth = 5;
        ctx.moveTo(x, bottomY - 40);
        ctx.lineTo(x, bottomY);
        ctx.stroke();
        ctx.lineWidth = 2;
      } else {
        if (pickets === "none") continue;
        ctx.lineWidth = 2;
        ctx.moveTo(x, bottomY - 40);
        ctx.lineTo(x, bottomY);
        ctx.stroke();
      }
      if (i == centerIndex) {
        break;
      }
    }
    // Add this inside your drawGate function, after drawing the main gate
    // const kitType = document.querySelector(
    //   'input[name="kitType"]:checked'
    // ).value;
    if (kitType === "swing") {
      if (showArch != true) {
        drawHinges(startX, topY - 30, bottomY, startX + panelWidth + 25);
      } else {
        drawHinges(startX, topY, bottomY, startX + panelWidth + 25);
      }
    } else if (kitType === "slider") {
      if (showArch != true) {
        drawWheels(startX, topY - 30, panelWidth, bottomY, panelWidth);
      } else {
        drawWheels(startX, topY - 30, panelWidth, bottomY, panelWidth);
      }
    }
    // If gate width is 10 feet, split the center stroke
    if (
      numericFeet >= 10 ||
      (numericFeet >= 10 && ironwood == "horizontal") ||
      (ironwood == "diy" && numericFeet >= 10)
    ) {
      //   const halfPanelWidth = panelWidth / 2;
      //   const leftCenterX = startX + halfPanelWidth / 2;
      //   const rightCenterX = startX + halfPanelWidth + halfPanelWidth / 2;
    }
  };

  const drawGate = (): void => {
    const showArch = style === "arch" || style === "both";
    const showFinials = style === "finials" || style === "both";
    // const gateType = document.querySelector(
    //   'input[name="gateType"]:checked'
    // ).value;
    // const pickets = document.querySelector(
    //   'input[name="pickets"]:checked'
    // ).value;
    // const ironwoodType = document.querySelector(
    //   'input[name="ironwoodType"]:checked'
    // ).value;
    // const gateWidth = parseInt(document.getElementById("widthSlider").value);
    getWidthInFeetAndInches();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const bottomY = 350;
    const topY = getTopY();
    const picketGap = 20;

    let picketCount = Math.floor(width / picketGap);
    if (picketCount % 2 === 0) picketCount++;

    const panelWidth = (picketCount - 1) * picketGap;
    // for double gate
    const startX = centerX - panelWidth / 2;
    const gapBetweenGates = 10; // always 10px gap total
    const halfGap = gapBetweenGates / 2;
    const halfPanelWidth = ((picketCount - 1) * picketGap) / 2;

    const leftPanelX = centerX - halfGap - halfPanelWidth;
    const rightPanelX = centerX + halfGap + halfPanelWidth; // this will be used for the mirror logic

    // Draw ironwood background first if vertical is selected
    if (ironwood === "vertical") {
      drawVerticalIronwood(startX, panelWidth, topY, bottomY, showArch);
    } else if (ironwood === "horizontal") {
      drawHorizontalIronwood(startX, panelWidth, topY, bottomY, showArch);
    } else {
      // Default white background
      ctx.fillStyle = "white";
      ctx.fillRect(startX, topY, panelWidth, bottomY - topY);
    }

    ctx.lineWidth = 2;

    if (panels === "solo") {
      drawPanel(
        startX,
        picketCount,
        picketGap,
        topY,
        bottomY,
        showArch,
        showFinials
      );
    } else {
      // Draw left side (half gate)
      drawPanelDouble(
        leftPanelX,
        picketCount,
        picketGap,
        topY,
        bottomY,
        showArch,
        showFinials
      );

      // Draw mirrored right side
      ctx.save();
      ctx.translate(canvas.width, 0); // Flip horizontally
      ctx.scale(-1, 1);
      drawPanelDouble(
        canvas.width - rightPanelX,
        picketCount,
        picketGap,
        topY,
        bottomY,
        showArch,
        showFinials
      );
      ctx.restore();
    }
    // Draw Height and Width labels on the canvas
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    // Height label on left side
    ctx.fillText(getHeightInFeetAndInches(), startX - 40, (topY + bottomY) / 2);
    //img, x, y, width, height
    const img = new Image();
    if (access == "manual") {
      img.src = "/icons8-lightning-bolt-100.png";
    } else if (access == "automatic") {
      img.src = "/icons8-lightning-bolt-solid-100.png";
    }
    // img.src = "/icons8-lightning-bolt-100.png";
    img.onload = () => {
      ctx.drawImage(img, canvas.width - 50, (topY + bottomY) / 2 - 20, 40, 40);
    };

    ctx.textAlign = "center";
    // Width label at the bottom center
    ctx.fillText(getWidthInFeetAndInches(), canvas.width / 2, 380);
  };

  // Old Gates Code
  // Function to draw gate on canvas
  // const drawGate = (ctx: CanvasRenderingContext2D, config: any) => {
  //   // Set gate dimensions
  //   const gateHeight = 180;
  //   const gateWidth = 250 * (config.width / 12); // Scale width based on selected width
  //   const postWidth = 20;
  //   const startX = (400 - gateWidth) / 2;
  //   const startY = 50;

  //   // Draw posts
  //   ctx.fillStyle = "#333";
  //   ctx.fillRect(startX - postWidth / 2, startY, postWidth, gateHeight);
  //   ctx.fillRect(
  //     startX + gateWidth - postWidth / 2,
  //     startY,
  //     postWidth,
  //     gateHeight
  //   );

  //   // Draw gate base frame
  //   ctx.strokeStyle = "#333";
  //   ctx.lineWidth = 5;

  //   if (config.panels === "Dual") {
  //     // Draw dual panels
  //     const halfWidth = gateWidth / 2;

  //     // Left panel
  //     ctx.beginPath();
  //     ctx.rect(startX, startY, halfWidth - 2, gateHeight);
  //     ctx.stroke();

  //     // Right panel
  //     ctx.beginPath();
  //     ctx.rect(startX + halfWidth + 2, startY, halfWidth - 2, gateHeight);
  //     ctx.stroke();

  //     // Add horizontal bar
  //     ctx.beginPath();
  //     ctx.moveTo(startX, startY + gateHeight / 2);
  //     ctx.lineTo(startX + halfWidth - 2, startY + gateHeight / 2);
  //     ctx.stroke();

  //     ctx.beginPath();
  //     ctx.moveTo(startX + halfWidth + 2, startY + gateHeight / 2);
  //     ctx.lineTo(startX + gateWidth, startY + gateHeight / 2);
  //     ctx.stroke();

  //     // Draw pickets
  //     drawPickets(
  //       ctx,
  //       startX,
  //       startY,
  //       halfWidth - 2,
  //       gateHeight,
  //       config.pickets,
  //       8
  //     );
  //     drawPickets(
  //       ctx,
  //       startX + halfWidth + 2,
  //       startY,
  //       halfWidth - 2,
  //       gateHeight,
  //       config.pickets,
  //       8
  //     );

  //     // Draw arch if selected
  //     if (config.style === "Arch") {
  //       drawArch(
  //         ctx,
  //         startX,
  //         startY,
  //         halfWidth - 2,
  //         gateHeight,
  //         config.pickets
  //       );
  //       drawArch(
  //         ctx,
  //         startX + halfWidth + 2,
  //         startY,
  //         halfWidth - 2,
  //         gateHeight,
  //         config.pickets
  //       );
  //     } else if (config.style === "Finials") {
  //       drawFinials(
  //         ctx,
  //         startX,
  //         startY,
  //         halfWidth - 2,
  //         gateHeight,
  //         config.pickets
  //       );
  //       drawFinials(
  //         ctx,
  //         startX + halfWidth + 2,
  //         startY,
  //         halfWidth - 2,
  //         gateHeight,
  //         config.pickets
  //       );
  //     } else if (config.style === "Both") {
  //       drawArch(
  //         ctx,
  //         startX,
  //         startY,
  //         halfWidth - 2,
  //         gateHeight,
  //         config.pickets
  //       );
  //       drawArch(
  //         ctx,
  //         startX + halfWidth + 2,
  //         startY,
  //         halfWidth - 2,
  //         gateHeight,
  //         config.pickets
  //       );
  //       drawFinials(
  //         ctx,
  //         startX,
  //         startY,
  //         halfWidth - 2,
  //         gateHeight,
  //         config.pickets
  //       );
  //       drawFinials(
  //         ctx,
  //         startX + halfWidth + 2,
  //         startY,
  //         halfWidth - 2,
  //         gateHeight,
  //         config.pickets
  //       );
  //     }
  //   } else {
  //     // Single panel
  //     ctx.beginPath();
  //     ctx.rect(startX, startY, gateWidth, gateHeight);
  //     ctx.stroke();

  //     // Add horizontal bar
  //     ctx.beginPath();
  //     ctx.moveTo(startX, startY + gateHeight / 2);
  //     ctx.lineTo(startX + gateWidth, startY + gateHeight / 2);
  //     ctx.stroke();

  //     // Draw pickets
  //     drawPickets(
  //       ctx,
  //       startX,
  //       startY,
  //       gateWidth,
  //       gateHeight,
  //       config.pickets,
  //       16
  //     );

  //     // Draw arch if selected
  //     if (config.style === "Arch") {
  //       drawArch(ctx, startX, startY, gateWidth, gateHeight, config.pickets);
  //     } else if (config.style === "Finials") {
  //       drawFinials(ctx, startX, startY, gateWidth, gateHeight, config.pickets);
  //     } else if (config.style === "Both") {
  //       drawArch(ctx, startX, startY, gateWidth, gateHeight, config.pickets);
  //       drawFinials(ctx, startX, startY, gateWidth, gateHeight, config.pickets);
  //     }
  //   }

  //   // Draw dimensions
  //   ctx.fillStyle = "#333";
  //   ctx.font = "12px Arial";
  //   ctx.fillText(
  //     `${config.width}' 0"`,
  //     startX + gateWidth / 2 - 15,
  //     startY + gateHeight + 30
  //   );
  //   ctx.fillText("6' 0\"", startX - 40, startY + gateHeight / 2 + 5);

  //   // Draw dimension lines
  //   ctx.beginPath();
  //   ctx.moveTo(startX - 10, startY);
  //   ctx.lineTo(startX - 30, startY);
  //   ctx.moveTo(startX - 20, startY);
  //   ctx.lineTo(startX - 20, startY + gateHeight);
  //   ctx.moveTo(startX - 30, startY + gateHeight);
  //   ctx.lineTo(startX - 10, startY + gateHeight);
  //   ctx.stroke();

  //   ctx.beginPath();
  //   ctx.moveTo(startX, startY + gateHeight + 10);
  //   ctx.lineTo(startX, startY + gateHeight + 20);
  //   ctx.moveTo(startX, startY + gateHeight + 15);
  //   ctx.lineTo(startX + gateWidth, startY + gateHeight + 15);
  //   ctx.moveTo(startX + gateWidth, startY + gateHeight + 10);
  //   ctx.lineTo(startX + gateWidth, startY + gateHeight + 20);
  //   ctx.stroke();
  // };

  // Helper function to draw pickets
  // const drawPickets = (
  //   ctx: CanvasRenderingContext2D,
  //   x: number,
  //   y: number,
  //   width: number,
  //   height: number,
  //   type: string,
  //   count: number
  // ) => {
  //   const picketWidth = type === "Double" ? 10 : 5;
  //   const picketSpacing = (width - picketWidth * count) / (count - 1);

  //   ctx.lineWidth = picketWidth;
  //   ctx.strokeStyle = "#333";

  //   for (let i = 0; i < count; i++) {
  //     const picketX = x + i * (picketWidth + picketSpacing);
  //     ctx.beginPath();
  //     ctx.moveTo(picketX, y + 5);
  //     ctx.lineTo(picketX, y + height - 5);
  //     ctx.stroke();
  //   }
  // };

  // Helper function to draw arch
  // const drawArch = (
  //   ctx: CanvasRenderingContext2D,
  //   x: number,
  //   y: number,
  //   width: number,
  //   height: number,
  //   picketType: string
  // ) => {
  //   const archHeight = 30;

  //   ctx.beginPath();
  //   ctx.moveTo(x, y);
  //   ctx.bezierCurveTo(
  //     x + width / 2,
  //     y - archHeight,
  //     x + width / 2,
  //     y - archHeight,
  //     x + width,
  //     y
  //   );
  //   ctx.strokeStyle = "#333";
  //   ctx.lineWidth = 5;
  //   ctx.stroke();
  // };

  // Helper function to draw finials
  // const drawFinials = (
  //   ctx: CanvasRenderingContext2D,
  //   x: number,
  //   y: number,
  //   width: number,
  //   height: number,
  //   picketType: string
  // ) => {
  //   const picketWidth = picketType === "Double" ? 10 : 5;
  //   const picketSpacing = (width - picketWidth * 8) / 7;

  //   for (let i = 0; i < 8; i++) {
  //     const picketX = x + i * (picketWidth + picketSpacing);

  //     ctx.beginPath();
  //     ctx.arc(picketX, y, 4, 0, Math.PI * 2);
  //     ctx.fillStyle = "#333";
  //     ctx.fill();
  //   }
  // };

  // Update price adjustments

  const allHandlers = () => {
    // handleWidthChange(width);
    // handleHeightChange(height);
    handleKitChange(kitType);
    handlePanelsChange(panels);
    handleStyleChange(style);
    handlePicketsChange(pickets);
    handleIronwoodChange(ironwood);
    handleAccessChange(access);
  };

  const handleKitChange = (value: string) => {
    setKitType(value);
    switch (value) {
      case "none":
        setKitPrice(0);
        break;
      case "swing":
        setKitPrice(500);
        break;
      case "slide":
        setKitPrice(750);
        break;
      default:
        setKitPrice(500);
    }
  };

  const handlePanelsChange = (value: string) => {
    setPanels(value);
    switch (value) {
      case "solo":
        setPanelsPrice(0);
        break;
      case "double":
        setPanelsPrice(0);
        break;
      default:
        setPanelsPrice(0);
    }
  };

  const handleStyleChange = (value: string) => {
    setStyle(value);
    switch (value) {
      case "none":
        setStylePrice(0);
        break;
      case "arch":
        setStylePrice(266);
        break;
      case "finials":
        setStylePrice(320);
        break;
      case "both":
        setStylePrice(450);
        break;
      default:
        setStylePrice(266);
    }
  };

  const handlePicketsChange = (value: string) => {
    setPickets(value);
    switch (value) {
      case "none":
        setPicketsPrice(0);
        break;
      case "single":
        setPicketsPrice(532);
        break;
      case "puppy":
        setPicketsPrice(600);
        break;
      case "double":
        setPicketsPrice(750);
        break;
      default:
        setPicketsPrice(532);
    }
  };

  const handleIronwoodChange = (value: string) => {
    setIronwood(value);
    switch (value) {
      case "none":
        setIronwoodPrice(0);
        break;
      case "vertical":
        setIronwoodPrice(200);
        break;
      case "horizontal":
        setIronwoodPrice(250);
        break;
      case "diy":
        setIronwoodPrice(100);
        break;
      default:
        setIronwoodPrice(0);
    }
  };

  const handleAccessChange = (value: string) => {
    setAccess(value);
    switch (value) {
      case "none":
        setAccessPrice(0);
        break;
      case "manual":
        setAccessPrice(75);
        break;
      case "automatic":
        setAccessPrice(550);
        break;
      default:
        setAccessPrice(75);
    }
  };

  // Add cart functionality
  const { addItem } = useCart();
  const { toast } = useToast();

  // Handle adding configured gate to cart
  const handleAddToCart = () => {
    // Create a unique ID for the cart item
    const id = Date.now();

    // Create the cart item from the current configuration
    const cartItem = {
      id,
      type: "gate" as const,
      name: "Custom Gate",
      description: `${width}ft ${
        kitType === "Swing" ? "6in" : "0in"
      } Wide, ${kitType} Kit, ${panels} Panels, ${style} Style, ${pickets} Pickets, ${access} Access`,
      price: totalPrice,
      originalPrice: totalPrice + 300, // Example original price for savings display
      image: "./fence.jpg",
      configuration: {
        width,
        height,
        kitType,
        panels,
        style,
        pickets,
        ironwood,
        access,
      },
    };

    //   // Add the item to the cart
    addItem(cartItem);

    // Show success toast
    toast({
      title: "Added to cart!",
      description: "Your custom gate has been added to your cart.",
      duration: 3000,
    });
  };

  // Sample gate products for the catalog section
  const products: Product[] = [
    {
      id: 1,
      name: "Modern Arched Gate",
      description: "Elegant design with premium materials",
      price: 1299,
      image: "./fence.jpg",
      category: "Driveway",
      tag: "POPULAR",
      features: [
        "Aluminum construction",
        "Custom sizing",
        "Swing or sliding options",
        "Multiple color options",
      ],
    },
    {
      id: 2,
      name: "Security Sliding Gate",
      description: "Maximum security with modern aesthetic",
      price: 1599,
      image: "./fence.jpg",
      category: "Driveway",
      features: [
        "Steel construction",
        "Smart lock compatibility",
        "Remote control included",
        "Weather resistant",
      ],
    },
    {
      id: 3,
      name: "Classic Wrought Iron",
      description: "Timeless design with modern functionality",
      price: 1899,
      image: "./fence.jpg",
      category: "Garden",
      tag: "BESTSELLER",
      features: [
        "Wrought iron construction",
        "Decorative elements",
        "Rust-resistant coating",
        "Traditional craftsmanship",
      ],
    },
    {
      id: 4,
      name: "Smart Security Gate",
      description: "App-controlled with advanced security",
      price: 2199,
      image: "./fence.jpg",
      category: "Driveway",
      features: [
        "IoT integration",
        "Camera and intercom",
        "Smartphone control",
        "Voice assistant compatible",
      ],
    },
    {
      id: 5,
      name: "Contemporary Pivot Gate",
      description: "Modern design with unique pivot mechanism",
      price: 2499,
      image: "./fence.jpg",
      category: "Driveway",
      features: [
        "Unique pivot design",
        "Minimal space requirements",
        "Custom sizes available",
        "Premium materials",
      ],
    },
    {
      id: 6,
      name: "Garden Arch Gate",
      description: "Beautiful garden entrance with climbing plant support",
      price: 1199,
      image: "./fence.jpg",
      category: "Garden",
      features: [
        "Plant-friendly design",
        "Weather-resistant",
        "Easy installation",
        "Classic arched top",
      ],
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Custom Gates Collection
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Browse our exclusive selection of premium custom gates designed and
            manufactured in the USA
          </p>
        </div>
      </section>

      {/* Gate Configurator Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">
            CUSTOM GATE
          </h2>
          <p className="text-center text-slate-600 mb-8">
            {width}ft {kitType === "swing" ? "6in" : "0in"} Wide, {kitType} Kit,{" "}
            {panels} Panels, {style} Style, {pickets} Pickets, {access} Access,
            ~{weight}lbs
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            {/* Left side: Gate Preview */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto border border-slate-200 rounded-lg"
                  width="500"
                  height="400"
                  id="gateCanvas"
                ></canvas>
              </div>
            </div>

            {/* Right side: Configuration Options */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Width Configuration */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">
                        1
                      </span>
                      <h3 className="text-lg font-medium">Width</h3>
                    </div>
                    <div className="text-green-500 font-medium">
                      +${basePrice}
                    </div>
                    <div
                      className="flex items-center text-slate-400"
                      id="accordion-collapse"
                      data-accordion="collapse"
                    >
                      {/* <Accordion open={openItems[1]}>
                        <AccordionHeader onClick={() => handleOpen(1)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion> */}
                      <div
                        id="accordion-collapse-body-1"
                        className="hidden"
                        aria-labelledby="accordion-collapse-heading-1"
                      >
                        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                          <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Flowbite is an open-source library of interactive
                            components built on top of Tailwind CSS including
                            buttons, dropdowns, modals, navbars, and more.
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            Check out this guide to learn how to{" "}
                            <a
                              href="/docs/getting-started/introduction/"
                              className="text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              get started
                            </a>{" "}
                            and start developing websites even faster with
                            components on top of Tailwind CSS.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Slider
                    defaultValue={[width]}
                    max={900}
                    min={155}
                    // step={1}
                    onValueChange={(value) => setWidth(value[0])}
                    className="mb-2"
                  />
                  <div
                    className={`${
                      openItems[1] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>See gate image for dimensions</b>
                    </p>
                    <b>Size</b>: If the size you need isn't shown, let us know.
                    Unless requested otherwise, all gates are 6ft tall when set
                    on v-track (slide) or 2 inches above the ground (swing).
                  </div>
                </div>

                {/* Height Configuration */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">
                        2
                      </span>
                      <h3 className="text-lg font-medium">Height</h3>
                    </div>
                    <div className="text-green-500 font-medium">
                      +${basePrice}
                    </div>
                    <div className="flex items-center text-slate-400">
                      {/* <Accordion open={openItems[2]}>
                        <AccordionHeader onClick={() => handleOpen(2)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion> */}
                    </div>
                  </div>

                  <Slider
                    defaultValue={[height]}
                    max={39}
                    min={3}
                    step={1}
                    onValueChange={(value) => setHeight(value[0])}
                    className="mb-2"
                  />
                  <div
                    className={`${
                      openItems[2] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>See gate image for dimensions</b>
                    </p>
                    <b>Size</b>: If the size you need isn't shown, let us know.
                    Unless requested otherwise, all gates are minimum 3ft and
                    maximum 6ft tall when set on v-track (slide) or 2 inches
                    above the ground (swing).
                  </div>
                </div>
                {/* Kit Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">
                        3
                      </span>
                      <h3 className="text-lg font-medium">Kit</h3>
                    </div>
                    <div className="text-green-500 font-medium">
                      +${kitPrice}
                    </div>
                    <div className="flex items-center text-slate-400">
                      {/* <Accordion open={openItems[3]}>
                        <AccordionHeader onClick={() => handleOpen(3)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        kitType === "none"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setKitType("none")}
                    >
                      None
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        kitType === "swing"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setKitType("swing")}
                    >
                      Swing
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        kitType === "slider"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setKitType("slider")}
                    >
                      Slide
                    </div>
                  </div>
                  <div
                    className={`${
                      openItems[3] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>Our 2 most popular gate kits</b>
                    </p>
                    <b>None:</b> You can use our Individual Parts page to build
                    your own, even more custom, gate kit.<br></br> <b>Swing:</b>{" "}
                    Includes heavy duty hinges and 4x4 94 inch heavy/regular
                    posts with caps. Swings open over 180 degrees without
                    automation.<br></br>
                    <b>Slide:</b> Includes V-wheels, V-track, rollers, 4in
                    posts, and stops. Arch/finial slide gates will ship with one
                    extra post per panel. Automatic slide gates require 2ft/4ft
                    of additional horizontal clearance for gate tail(s).
                  </div>
                </div>

                {/* Panels Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">
                        4
                      </span>
                      <h3 className="text-lg font-medium">Panels</h3>
                    </div>
                    <div className="text-green-500 font-medium">
                      +${panelsPrice}
                    </div>
                    <div className="flex items-center text-slate-400">
                      {/* <Accordion open={openItems[4]}>
                        <AccordionHeader onClick={() => handleOpen(4)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        panels === "solo"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setPanels("solo")}
                    >
                      Solo
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        panels === "double"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setPanels("double")}
                    >
                      Dual
                    </div>
                  </div>
                  <div
                    className={`${
                      openItems[4] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>Steel thick enough to screw into</b>
                    </p>
                    <b>Solo:</b> Gate opens from the side. 10ft+ wide panels
                    ship in 2 bolt connectable sections.<br></br> <b>Dual:</b>{" "}
                    Gate opens from the center.
                  </div>
                </div>

                {/* Style Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">
                        5
                      </span>
                      <h3 className="text-lg font-medium">Style</h3>
                    </div>
                    <div className="text-green-500 font-medium">
                      +${stylePrice}
                    </div>
                    <div className="flex items-center text-slate-400">
                      {/* <Accordion open={openItems[5]}>
                        <AccordionHeader onClick={() => handleOpen(5)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        style === "none"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setStyle("none")}
                    >
                      None
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        style === "arch"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setStyle("arch")}
                    >
                      Arch
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        style === "finials"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setStyle("finials")}
                    >
                      Finials
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        style === "both"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setStyle("both")}
                    >
                      Both
                    </div>
                  </div>
                  <div
                    className={`${
                      openItems[5] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>Classic styles on modern gates</b>
                    </p>
                    <b>None:</b> Sometimes a flat top is all you need. <br></br>{" "}
                    <b>Arch:</b>
                    Rounds the shoulders of your gate down approximately 1ft for
                    a luxurious sunrise shape.<br></br> <b>Finials:</b> Makes
                    your gate even more intimidating. Adds 2 inches to the total
                    height. <br></br>
                    <b>Both:</b>
                    There's nothing more stylish than an arch with finials.
                  </div>
                </div>

                {/* Pickets Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">
                        6
                      </span>
                      <h3 className="text-lg font-medium">Pickets</h3>
                    </div>
                    <div className="text-green-500 font-medium">
                      +${picketsPrice}
                    </div>
                    <div className="flex items-center text-slate-400">
                      {/* <Accordion open={openItems[6]}>
                        <AccordionHeader onClick={() => handleOpen(6)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        pickets === "none"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setPickets("none")}
                    >
                      None
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        pickets === "solo"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setPickets("solo")}
                    >
                      Single
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        pickets === "puppy"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setPickets("puppy")}
                    >
                      Puppy
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        pickets === "double"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setPickets("double")}
                    >
                      Double
                    </div>
                  </div>
                  <div
                    className={`${
                      openItems[6] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>Beautifully internally welded and sealed</b>
                    </p>
                    <b>None:</b> A great choice for horizontal ironwood gates or
                    if you plan on attaching your own material.<br></br>{" "}
                    <b>Single:</b> Thick round steel tubing set 4 inches apart.
                    <br></br> <b>Puppy:</b> Doubles the amount of pickets under
                    the crossbar to look good and help discourage pets from
                    escaping. <br></br>
                    <b>Double:</b> Maximum security and perfect for sliding
                    gates.
                  </div>
                </div>

                {/* Ironwood Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">
                        7
                      </span>
                      <h3 className="text-lg font-medium">Ironwood</h3>
                    </div>
                    <div className="text-green-500 font-medium">
                      +${ironwoodPrice}
                    </div>
                    <div className="flex items-center text-slate-400">
                      {/* <Accordion open={openItems[7]}>
                        <AccordionHeader onClick={() => handleOpen(7)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        ironwood === "none"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setIronwood("none")}
                    >
                      None
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        ironwood === "vertical"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setIronwood("vertical")}
                    >
                      Vertical
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        ironwood === "horizontal"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setIronwood("horizontal")}
                    >
                      Horizontal
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        ironwood === "diy"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setIronwood("diy")}
                    >
                      DIY
                    </div>
                  </div>
                  <div
                    className={`${
                      openItems[7] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>The perfect wood for any gate</b>
                    </p>
                    <b>None:</b> A light weight timeless option. <br></br>
                    <b>Vertical:</b> Match-all sustainable hardwood vertically
                    attached to the face of each panel.<br></br>{" "}
                    <b>Horizontal:</b> Match-all sustainable hardwood
                    horizontally attached to the face of each panel.<br></br>{" "}
                    <b>DIY:</b> Do it yourself. Perfect if you plan on adding
                    your own wood.
                  </div>
                </div>

                {/* Access Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">
                        8
                      </span>
                      <h3 className="text-lg font-medium">Access</h3>
                    </div>
                    <div className="text-green-500 font-medium">
                      +${accessPrice}
                    </div>
                    <div className="flex items-center text-slate-400">
                      {/* <Accordion open={openItems[8]}>
                        <AccordionHeader onClick={() => handleOpen(8)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        access === "none"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setAccess("none")}
                    >
                      None
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        access === "manual"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setAccess("manual")}
                    >
                      Manual
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        access === "automatic"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setAccess("automatic")}
                    >
                      Automatic
                    </div>
                  </div>
                  <div
                    className={`${
                      openItems[8] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>Gate automation made easy</b>
                    </p>
                    <b>None:</b> You can always create your own access kit
                    through our Parts page. <br></br>
                    <b>Manual:</b> Comes with large gate cane bolt(s) and/or a
                    gate latch depending on the type of gate you're ordering{" "}
                    <br></br>
                    <b>Automatic:</b> Comes with all the motors and hardware
                    required to automate your gate, as well as a free remote, a
                    safety sensor, and a battery that trickle charges through
                    low voltage wire. Automation can be installed safely without
                    an electrician and will temporarily hold a charge during a
                    power outage. Swing gates use Linear operators and slide
                    gates use LiftMaster.
                  </div>
                </div>

                {/* Order Button */}
                <div className="flex items-center justify-between py-4">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg rounded-md w-full"
                    onClick={handleAddToCart}
                  >
                    Add To Cart - ${totalPrice}
                  </Button>
                </div>

                <div className="text-center text-sm text-slate-600">
                  <div className="font-semibold">Est. Ships In: 2 Weeks</div>
                  <div className="mt-1">
                    Need your gate much sooner?
                    <br />
                    Select <span className="text-blue-500">Expedite</span>{" "}
                    during checkout.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gates Catalog */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-3xl font-bold text-slate-900">
                Our Gate Designs
              </h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="driveway">Driveway</TabsTrigger>
                <TabsTrigger value="garden">Garden</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="driveway">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.category === "Driveway")
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="garden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.category === "Garden")
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">
            Why Choose Our Gates
          </h2>
          {/* <Accordion open={openItems[1]}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              What is Material Tailwind?
            </AccordionHeader>
            <AccordionBody>
              We&apos;re not always in the position that we want to be at.
              We&apos;re constantly growing. We&apos;re constantly making
              mistakes. We&apos;re constantly trying to express ourselves and
              actualize our dreams.
            </AccordionBody>
          </Accordion> */}

          {/* <Accordion open={openItems[2]}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              How to use Material Tailwind?
            </AccordionHeader>
            <AccordionBody>
              We&apos;re not always in the position that we want to be at.
              We&apos;re constantly growing. We&apos;re constantly making
              mistakes. We&apos;re constantly trying to express ourselves and
              actualize our dreams.
            </AccordionBody>
          </Accordion> */}

          {/* <Accordion open={openItems[3]}>
            <AccordionHeader onClick={() => handleOpen(3)}>
              What can I do with Material Tailwind?
            </AccordionHeader>
            <AccordionBody>
              We&apos;re not always in the position that we want to be at.
              We&apos;re constantly growing. We&apos;re constantly making
              mistakes. We&apos;re constantly trying to express ourselves and
              actualize our dreams.
            </AccordionBody>
          </Accordion> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">
                  Premium Quality
                </h3>
                <p className="text-slate-600">
                  All our gates are crafted with the highest quality materials
                  to ensure durability and longevity in any weather condition.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">
                  Custom Design
                </h3>
                <p className="text-slate-600">
                  Work with our designers to create a gate that perfectly
                  matches your home's style and meets your security needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">
                  Easy Installation
                </h3>
                <p className="text-slate-600">
                  Our gates come with detailed DIY installation guides, or we
                  can connect you with certified installers in your area.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        {product.tag && (
          <Badge
            className={`absolute top-2 right-2 ${
              product.tag === "BESTSELLER" ? "bg-green-500" : "bg-secondary"
            }`}
          >
            {product.tag}
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="font-heading font-semibold text-xl mb-2">
          {product.name}
        </h3>
        <p className="text-slate-600 mb-4">{product.description}</p>

        <ul className="mb-6 space-y-2">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center">
          <span className="text-primary font-heading font-bold text-xl">
            ${product.price}
          </span>
          <Button>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
