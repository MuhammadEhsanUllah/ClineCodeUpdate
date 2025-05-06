import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import CTASection from "@/components/cta-section";
import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
// import {
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";

interface Fence {
  id: number;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  features: string[];
  tag?: string;
}
interface OpenItems {
  [key: number]: boolean;
}

export default function Fences() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [basePrice, setBasePrice] = useState(1998);
  const [totalPrice, setTotalPrice] = useState(1998);

  // Gate configuration options
  const [width, setWidth] = useState(155); // feet
  const [height, setHeight] = useState(20); // feet
  const [kitType, setKitType] = useState("swing");
  const [panels, setPanels] = useState("solo");
  const [style, setStyle] = useState("none");
  const [pickets, setPickets] = useState("solo");
  const [ironwood, setIronwood] = useState("none");
  const [access, setAccess] = useState("manual");
  const [posts, setPosts] = useState("none");

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

  // const handleOpen = (value: number) => {
  //   setOpenItems((prev) => ({
  //     ...prev,
  //     [value]: !prev[value], // Toggle only the clicked item
  //   }));
  // };
  const handleOpen = (index: number) => {
    setOpenItems((prevState) => ({
      ...prevState, // spread the previous state to preserve other values
      [index]: !prevState[index], // toggle the open state for the specific accordion
    }));
  };
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

    // for removing errors
    handleOpen(5);
    setBasePrice(1998);

    // Draw gate based on configuration
    drawGate();
    allHandlers();
  }, [width, height, kitType, panels, style, pickets, ironwood, access, posts]);

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
    showFinials: boolean,
    posts: string
  ): void => {
    const panelWidth = (picketCount - 1) * picketGap;
    const topPoints = [];
    console.log(`Picket Count: ${showFinials}`);
    // let lastIndexVal = 0;
    // this calcultate gatewidth and convert to feet and inches
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
      // if (panels === "double") {
      //   if (i == Math.floor(picketCount / 2)) {
      //     break;
      //   }
      // }
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

    if (numericFeet >= 5) {
      ctx.beginPath();
      ctx.moveTo(centerX, topY);
      ctx.lineTo(centerX, bottomY - 40);
      ctx.stroke();
    }

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

    // // condition for double gate
    // if (panels == "double") {
    //   ctx.beginPath();
    //   ctx.moveTo(startX, bottomY - 40);
    //   ctx.lineTo(startX + panelWidth / 2, bottomY - 40);
    //   ctx.lineTo(startX + panelWidth / 2, bottomY);
    //   ctx.lineTo(startX, bottomY);
    //   ctx.closePath();
    //   ctx.stroke();
    // }

    ctx.beginPath();
    for (let i = 0; i < picketCount; i++) {
      const x = startX + i * picketGap;
      ctx.beginPath();

      // if (
      //   numericFeet >= 10 ||
      //   (numericFeet >= 10 && ironwood == "horizontal") ||
      //   (ironwood == "diy" && numericFeet >= 10)
      // ) {
      //   // Check if width is around 10 feet
      //   const halfPanelWidth = ((picketCount - 1) * picketGap) / 2;
      //   const leftCenterX = startX + halfPanelWidth / 2;
      //   const rightCenterX = startX + halfPanelWidth + halfPanelWidth / 2;

      //   // Draw left center lines
      //   ctx.lineWidth = 5;
      //   ctx.beginPath();

      //   ctx.beginPath();
      //   let topYx = showArch ? topY + 10 : topY;
      //   ctx.moveTo(leftCenterX, topYx);
      //   ctx.lineTo(leftCenterX, bottomY);
      //   ctx.stroke();

      //   // Draw right center lines
      //   ctx.beginPath();
      //   let topYz = showArch ? topY + 10 : topY;
      //   ctx.moveTo(rightCenterX, topYz);
      //   ctx.lineTo(rightCenterX, bottomY);
      //   ctx.stroke();
      //   ctx.lineWidth = 2;
      // }

      if (i === centerIndex && numericFeet >= 5) {
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
      // if (panels === "double") {
      //   if (i == centerIndex) {
      //     break;
      //   }
      // }
    }

    // const kitType = document.querySelector(
    //   'input[name="kitType"]:checked'
    // ).value;
    if (posts === "one" || posts === "two") {
      if (!showArch) {
        drawHinges(startX, topY - 30, bottomY, startX + panelWidth + 25);
      } else {
        drawHinges(startX, topY, bottomY, startX + panelWidth + 25);
      }
    }

    // // If gate width is 10 feet, split the center stroke
    // if (
    //   numericFeet >= 10 ||
    //   (numericFeet >= 10 && ironwood == "horizontal") ||
    //   (ironwood == "diy" && numericFeet >= 10)
    // ) {
    //   const halfPanelWidth = panelWidth / 2;
    //   const leftCenterX = startX + halfPanelWidth / 2;
    //   const rightCenterX = startX + halfPanelWidth + halfPanelWidth / 2;
    // }
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
    const totalFeet = 1 + ((width - 155) * (10 - 1)) / (900 - 155);
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
    ctx.save();

    const pillarWidth = 10;
    const pillarHeight = bottomY - topY - 20;
    const roundedTopRadius = pillarWidth / 2;

    ctx.fillStyle = "#000";

    if (posts === "one" || posts === "two") {
      // Draw LEFT PILLAR
      ctx.beginPath();
      ctx.arc(
        startX - pillarWidth - 10 + roundedTopRadius, // centerX
        topY + 25 + roundedTopRadius, // centerY
        roundedTopRadius,
        Math.PI,
        2 * Math.PI
      );
      ctx.rect(
        startX - pillarWidth - 10,
        topY + 25 + roundedTopRadius,
        pillarWidth,
        pillarHeight - roundedTopRadius
      );
      ctx.fill();
    }

    if (posts === "two") {
      // Draw RIGHT PILLAR
      ctx.beginPath();
      ctx.arc(
        panelWidth - 20 + roundedTopRadius, // centerX
        topY + 25 + roundedTopRadius, // centerY
        roundedTopRadius,
        Math.PI,
        2 * Math.PI
      );
      ctx.rect(
        panelWidth - 20,
        topY + 25 + roundedTopRadius,
        pillarWidth,
        pillarHeight - roundedTopRadius
      );
      ctx.fill();
    }

    ctx.restore();
  };

  const drawGate = (): void => {
    const showArch = style === "arch" || style === "both";
    const showFinials = style === "finials" || style === "both";
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
    // const gapBetweenGates = 10; // always 10px gap total
    // const halfGap = gapBetweenGates / 2;
    // const halfPanelWidth = ((picketCount - 1) * picketGap) / 2;

    // const leftPanelX = centerX - halfGap - halfPanelWidth;
    // const rightPanelX = centerX + halfGap + halfPanelWidth; // this will be used for the mirror logic

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

    drawPanel(
      startX,
      picketCount,
      picketGap,
      topY,
      bottomY,
      showArch,
      showFinials,
      posts
    );
    ctx.restore();
    // Draw Height and Width labels on the canvas
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    // Height label on left side
    ctx.fillText(getHeightInFeetAndInches(), startX - 40, (topY + bottomY) / 2);
    //img, x, y, width, height

    ctx.textAlign = "center";
    // Width label at the bottom center
    ctx.fillText(getWidthInFeetAndInches(), canvas.width / 2, 380);
  };

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
  const fences: Fence[] = [
    {
      id: 1,
      name: "Premium Aluminum Fence",
      description:
        "Durable, maintenance-free aluminum fencing for residential and commercial properties",
      price: 85,
      priceUnit: "per linear foot",
      image: "./home.jpg",
      features: [
        "Rust and corrosion resistant",
        "Multiple height options",
        "Powder-coated finish",
        "15-year warranty",
      ],
      tag: "BESTSELLER",
    },
    {
      id: 2,
      name: "Modern Steel Security Fence",
      description:
        "High-security steel fencing with contemporary design for maximum protection",
      price: 110,
      priceUnit: "per linear foot",
      image: "./home.jpg",
      features: [
        "Anti-climb design",
        "Galvanized steel construction",
        "Custom height options",
        "Security spike options",
      ],
    },
    {
      id: 3,
      name: "Decorative Wrought Iron Fence",
      description:
        "Classic ornamental wrought iron fencing that combines beauty and security",
      price: 125,
      priceUnit: "per linear foot",
      image: "./home.jpg",
      features: [
        "Custom decorative elements",
        "Powder-coated finish",
        "Multiple color options",
        "Traditional craftsmanship",
      ],
    },
    {
      id: 4,
      name: "Privacy Wood Fence",
      description:
        "High-quality wood fencing that provides privacy and enhances your property",
      price: 75,
      priceUnit: "per linear foot",
      image: "./home.jpg",
      features: [
        "Premium cedar or pine options",
        "Custom height available",
        "Natural or stained finish",
        "Decorative post caps",
      ],
    },
    {
      id: 5,
      name: "Modern Horizontal Fence",
      description:
        "Contemporary horizontal slat fencing for a modern aesthetic",
      price: 90,
      priceUnit: "per linear foot",
      image: "./home.jpg",
      features: [
        "Customizable spacing",
        "Multiple material options",
        "Clean modern look",
        "Semi-privacy design",
      ],
      tag: "POPULAR",
    },
    {
      id: 6,
      name: "Composite Privacy Fence",
      description:
        "Low-maintenance composite fencing with the look of wood without the upkeep",
      price: 105,
      priceUnit: "per linear foot",
      image: "./home.jpg",
      features: [
        "Weather resistant",
        "No painting required",
        "Will not rot, warp or splinter",
        "25-year warranty",
      ],
    },
  ];

  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    // Create a unique ID for the cart item
    const id = Date.now();

    // Create the cart item from the current configuration
    const cartItem = {
      id,
      type: "fence" as const,
      name: "Custom Fence",
      description: `${width}ft ${
        kitType === "Swing" ? "6in" : "0in"
      } Wide, ${kitType} Kit, ${panels} Panels, ${style} Style, ${pickets} Pickets, ${access} Access,${posts} Posts`,
      price: totalPrice,
      originalPrice: totalPrice + 300, // Example original price for savings display
      image:
        "https://firebasestorage.googleapis.com/v0/b/standardgates-222619.appspot.com/o/gallery%2F1536%2F6.jpg?alt=media&token=56dc4793-fb42-44db-a391-17ed1f9624b7",
      configuration: {
        width,
        height,
        kitType,
        panels,
        style,
        pickets,
        ironwood,
        access,
        posts,
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

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Premium Fencing Solutions
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Secure your property with our custom-made, high-quality fencing
            options
          </p>
        </div>
      </section>
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">
            CUSTOM FENCE
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
                      <b>See fence image for dimensions</b>
                    </p>
                    <b>Size</b>: If the size you need isn't shown, let us know.
                    Unless requested otherwise, all fence are 6ft tall when set
                    2 inches above the ground.
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
                      <h3 className="text-lg font-medium">Posts</h3>
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
                        posts === "none"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setPosts("none")}
                    >
                      None
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        posts === "one"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setPosts("one")}
                    >
                      One
                    </div>
                    <div
                      className={`h-10 flex items-center justify-center border ${
                        posts === "two"
                          ? "border-2 border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-slate-50"
                      } rounded-md cursor-pointer`}
                      onClick={() => setPosts("two")}
                    >
                      Two
                    </div>
                  </div>
                  <div
                    className={`${
                      openItems[3] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>Heavy duty 2.5" fence posts</b>
                    </p>
                    <b>None:</b> Fence panel will be bolted to posts/walls that
                    aren't presented here.<br></br> <b>One:</b> Fence panel will
                    bolted to this post and a post/wall not presented here.
                    <br></br>
                    <b>Two:</b> Fence panel will be bolted into these two posts.
                  </div>
                </div>

                {/* Panels Selection */}
                {/* <div className="bg-white rounded-lg shadow-sm p-4 relative">
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
                      <Accordion open={openItems[4]}>
                        <AccordionHeader onClick={() => handleOpen(4)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion>
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
                </div> */}

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
                      {/* <Accordion open={openItems[4]}>
                        <AccordionHeader onClick={() => handleOpen(4)}>
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
                      openItems[4] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>Classic styles on modern fences</b>
                    </p>
                    <b>None:</b> Sometimes a flat top is all you need. <br></br>{" "}
                    <b>Arch:</b>
                    Rounds the shoulders of your fence down approximately 1ft
                    for a luxurious sunrise shape.<br></br> <b>Finials:</b>{" "}
                    Makes your fence even more intimidating. Adds 2 inches to
                    the total height. <br></br>
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
                      openItems[5] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>Beautifully internally welded and sealed</b>
                    </p>
                    <b>None:</b>A great choice for horizontal ironwood fence or
                    if you plan on attaching your own material.<br></br>{" "}
                    <b>Single:</b> Thick round steel tubing set 4 inches apart.
                    <br></br> <b>Puppy:</b> Doubles the amount of pickets under
                    the crossbar to look good and help discourage pets from
                    escaping. <br></br>
                    <b>Double:</b> Maximum security and matches most sliding
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
                      openItems[6] ? "block" : "hidden"
                    } p-4 border-t border-slate-300`}
                  >
                    <p className="text-center mb-4">
                      <b>The perfect wood for any fence</b>
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
                {/* <div className="bg-white rounded-lg shadow-sm p-4 relative">
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
                      <Accordion open={openItems[8]}>
                        <AccordionHeader onClick={() => handleOpen(8)}>
                          <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            ?
                          </button>
                        </AccordionHeader>
                      </Accordion>
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
                </div> */}

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

      {/* Fences Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">
                Our Fencing Collection
              </h2>
              <p className="text-slate-600 max-w-2xl">
                Browse our selection of premium fences designed for durability,
                security, and aesthetic appeal. All products are made in the USA
                and come with our quality guarantee.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-primary">Request Custom Quote</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fences.map((fence) => (
              <Card
                key={fence.id}
                className="overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative">
                  <img
                    src={fence.image}
                    alt={fence.name}
                    className="w-full h-56 object-cover"
                  />
                  {fence.tag && (
                    <Badge
                      className={`absolute top-2 right-2 ${
                        fence.tag === "BESTSELLER"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {fence.tag}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-2">
                    {fence.name}
                  </h3>
                  <p className="text-slate-600 mb-4">{fence.description}</p>

                  <ul className="mb-6 space-y-2">
                    {fence.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-primary font-heading font-bold text-xl">
                        ${fence.price}
                      </span>
                      <span className="text-slate-500 text-sm ml-1">
                        {fence.priceUnit}
                      </span>
                    </div>
                    <Button>View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">
            Benefits of Our Fencing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Enhanced Security
                </h3>
                <p className="text-slate-600">
                  Our fences are designed to provide maximum security for your
                  property while maintaining aesthetic appeal.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Custom Design
                </h3>
                <p className="text-slate-600">
                  Personalize your fence with custom heights, materials, and
                  decorative elements to match your property.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Durability
                </h3>
                <p className="text-slate-600">
                  Built to withstand harsh weather conditions and provide years
                  of service with minimal maintenance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Value
                </h3>
                <p className="text-slate-600">
                  Increase your property value with a high-quality fence that
                  enhances curb appeal and security.
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
