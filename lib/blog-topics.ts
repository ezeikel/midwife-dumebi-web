export type BlogTopic = {
  topic: string;
  category: BlogCategory;
  keywords: string[];
  searchIntent: "informational" | "navigational" | "transactional";
};

export type BlogCategory =
  | "birth-planning"
  | "nhs-support"
  | "pain-relief"
  | "labour-and-birth"
  | "postnatal-care"
  | "breastfeeding-and-feeding"
  | "baby-care"
  | "emotional-wellbeing";

export const BLOG_CATEGORIES: Record<
  BlogCategory,
  { title: string; description: string; color: string }
> = {
  "birth-planning": {
    title: "Birth Planning",
    description:
      "Preparing for birth, birth preferences, and understanding your options",
    color: "#E8B4B8", // Rose
  },
  "nhs-support": {
    title: "NHS Support",
    description:
      "Understanding NHS maternity care, appointments, and your rights",
    color: "#A8C5B5", // Sage
  },
  "pain-relief": {
    title: "Pain Relief",
    description: "Pain management options during labour and birth",
    color: "#D4A574", // Terracotta
  },
  "labour-and-birth": {
    title: "Labour & Birth",
    description: "Stages of labour, interventions, and birth procedures",
    color: "#B8A8C5", // Lavender
  },
  "postnatal-care": {
    title: "Postnatal Care",
    description: "Recovery after birth, appointments, and self-care",
    color: "#C5B8A8", // Taupe
  },
  "breastfeeding-and-feeding": {
    title: "Breastfeeding & Feeding",
    description: "Feeding your baby, breastfeeding support, and alternatives",
    color: "#A8C5C5", // Teal
  },
  "baby-care": {
    title: "Baby Care",
    description: "Caring for your newborn, safety, and development",
    color: "#C5C5A8", // Olive
  },
  "emotional-wellbeing": {
    title: "Emotional Wellbeing",
    description: "Mental health during pregnancy and after birth",
    color: "#C5A8B8", // Mauve
  },
};

export const BLOG_TOPICS: BlogTopic[] = [
  // ==========================================
  // BIRTH PLANNING (15+ topics)
  // ==========================================
  {
    topic: "Understanding your birth options in the UK",
    category: "birth-planning",
    keywords: [
      "birth options UK",
      "where to give birth",
      "NHS birth choices",
      "home birth vs hospital",
    ],
    searchIntent: "informational",
  },
  {
    topic: "How to write a birth plan that works for you",
    category: "birth-planning",
    keywords: [
      "birth plan template",
      "writing a birth plan",
      "birth preferences",
      "birth plan NHS",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Questions to ask at your booking appointment",
    category: "birth-planning",
    keywords: [
      "booking appointment questions",
      "first midwife appointment",
      "NHS booking appointment",
      "antenatal booking",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Home birth vs hospital birth: making your choice",
    category: "birth-planning",
    keywords: [
      "home birth UK",
      "hospital birth",
      "birth location choice",
      "home birth safety",
    ],
    searchIntent: "informational",
  },
  {
    topic: "What is a birth centre and is it right for you?",
    category: "birth-planning",
    keywords: [
      "birth centre UK",
      "midwife-led unit",
      "MLU birth",
      "birth centre vs hospital",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding water birth options in the NHS",
    category: "birth-planning",
    keywords: [
      "water birth NHS",
      "birthing pool",
      "water birth benefits",
      "water birth safety",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Planning for a VBAC (vaginal birth after caesarean)",
    category: "birth-planning",
    keywords: [
      "VBAC UK",
      "vaginal birth after c-section",
      "VBAC success rate",
      "VBAC planning",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Your rights during pregnancy and birth",
    category: "birth-planning",
    keywords: [
      "maternity rights UK",
      "birth rights",
      "informed consent birth",
      "patient rights pregnancy",
    ],
    searchIntent: "informational",
  },
  {
    topic: "How to choose where to give birth",
    category: "birth-planning",
    keywords: [
      "choosing birth location",
      "birth place options",
      "NHS birth settings",
      "where to have baby",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding continuity of carer in the NHS",
    category: "birth-planning",
    keywords: [
      "continuity of carer",
      "same midwife pregnancy",
      "midwifery continuity",
      "NHS caseload midwifery",
    ],
    searchIntent: "informational",
  },
  {
    topic: "What to pack in your hospital bag",
    category: "birth-planning",
    keywords: [
      "hospital bag checklist",
      "what to pack for birth",
      "labour bag essentials",
      "hospital bag NHS",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Birth partners: who can support you during labour",
    category: "birth-planning",
    keywords: [
      "birth partner",
      "support during labour",
      "doula UK",
      "who can be at birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding private midwifery care in the UK",
    category: "birth-planning",
    keywords: [
      "private midwife UK",
      "independent midwife",
      "private maternity care",
      "hiring a midwife",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Preparing for a multiple birth: twins and more",
    category: "birth-planning",
    keywords: [
      "twins birth",
      "multiple pregnancy",
      "twin birth plan",
      "expecting twins",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Birth preferences for a breech baby",
    category: "birth-planning",
    keywords: [
      "breech birth options",
      "breech baby UK",
      "ECV procedure",
      "breech vaginal birth",
    ],
    searchIntent: "informational",
  },

  // ==========================================
  // NHS SUPPORT (15+ topics)
  // ==========================================
  {
    topic: "What to expect at your NHS antenatal appointments",
    category: "nhs-support",
    keywords: [
      "antenatal appointments",
      "NHS pregnancy appointments",
      "midwife appointments",
      "antenatal schedule",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding your maternity notes and abbreviations",
    category: "nhs-support",
    keywords: [
      "maternity notes",
      "pregnancy notes abbreviations",
      "NHS maternity records",
      "reading handheld notes",
    ],
    searchIntent: "informational",
  },
  {
    topic: "The role of your community midwife",
    category: "nhs-support",
    keywords: [
      "community midwife",
      "NHS midwife role",
      "midwife visits",
      "what does a midwife do",
    ],
    searchIntent: "informational",
  },
  {
    topic: "When and how to contact triage",
    category: "nhs-support",
    keywords: [
      "maternity triage",
      "when to call hospital",
      "pregnancy triage",
      "maternity assessment",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding the 12-week dating scan",
    category: "nhs-support",
    keywords: [
      "12 week scan",
      "dating scan",
      "first pregnancy scan",
      "nuchal translucency",
    ],
    searchIntent: "informational",
  },
  {
    topic: "What happens at the 20-week anomaly scan",
    category: "nhs-support",
    keywords: [
      "20 week scan",
      "anomaly scan",
      "anatomy scan",
      "mid-pregnancy scan",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Glucose tolerance test: what to expect",
    category: "nhs-support",
    keywords: [
      "glucose tolerance test",
      "GTT pregnancy",
      "gestational diabetes test",
      "OGTT pregnancy",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding growth scans and why you might need them",
    category: "nhs-support",
    keywords: [
      "growth scan pregnancy",
      "third trimester scan",
      "baby size scan",
      "fetal growth monitoring",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Your rights to choose your care provider",
    category: "nhs-support",
    keywords: [
      "NHS choice",
      "choosing maternity unit",
      "maternity care options",
      "right to choose hospital",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding NHS maternity pathways",
    category: "nhs-support",
    keywords: [
      "maternity pathway",
      "NHS pregnancy journey",
      "antenatal care pathway",
      "maternity care model",
    ],
    searchIntent: "informational",
  },
  {
    topic: "What is a consultant-led unit?",
    category: "nhs-support",
    keywords: [
      "consultant-led unit",
      "obstetric unit",
      "labour ward",
      "CLU birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Screening tests during pregnancy explained",
    category: "nhs-support",
    keywords: [
      "pregnancy screening",
      "antenatal screening",
      "Down syndrome test",
      "NIPT UK",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding high-risk pregnancy care",
    category: "nhs-support",
    keywords: [
      "high risk pregnancy",
      "consultant care pregnancy",
      "complicated pregnancy",
      "risk factors pregnancy",
    ],
    searchIntent: "informational",
  },
  {
    topic: "What happens if your pregnancy goes past your due date",
    category: "nhs-support",
    keywords: [
      "overdue pregnancy",
      "post-term pregnancy",
      "past due date",
      "late pregnancy monitoring",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Group B Strep testing and treatment in the UK",
    category: "nhs-support",
    keywords: [
      "Group B Strep",
      "GBS pregnancy",
      "strep B test",
      "GBS antibiotics labour",
    ],
    searchIntent: "informational",
  },

  // ==========================================
  // PAIN RELIEF (12 topics)
  // ==========================================
  {
    topic: "Natural pain relief options for labour",
    category: "pain-relief",
    keywords: [
      "natural pain relief labour",
      "drug-free birth",
      "non-medical pain relief",
      "natural childbirth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding epidurals: benefits and risks",
    category: "pain-relief",
    keywords: [
      "epidural UK",
      "epidural side effects",
      "epidural labour",
      "regional anaesthesia birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Gas and air (Entonox): what you need to know",
    category: "pain-relief",
    keywords: [
      "gas and air",
      "Entonox labour",
      "laughing gas birth",
      "nitrous oxide labour",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Pethidine and diamorphine: opioid pain relief in labour",
    category: "pain-relief",
    keywords: [
      "pethidine labour",
      "diamorphine birth",
      "opioid pain relief labour",
      "injection pain relief birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "TENS machines: how they work and when to use them",
    category: "pain-relief",
    keywords: [
      "TENS machine labour",
      "TENS birth",
      "using TENS for contractions",
      "hire TENS machine",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Water for pain relief: pools and baths in labour",
    category: "pain-relief",
    keywords: [
      "birthing pool pain relief",
      "water labour",
      "bath during labour",
      "hydrotherapy birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Hypnobirthing techniques for pain management",
    category: "pain-relief",
    keywords: [
      "hypnobirthing UK",
      "hypnobirthing techniques",
      "self-hypnosis labour",
      "hypnobirthing breathing",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Breathing techniques for labour",
    category: "pain-relief",
    keywords: [
      "breathing labour",
      "labour breathing techniques",
      "breathing through contractions",
      "birth breathing",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Movement and positions for managing contractions",
    category: "pain-relief",
    keywords: [
      "labour positions",
      "active birth positions",
      "movement during labour",
      "upright positions birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Combining pain relief methods: what works together",
    category: "pain-relief",
    keywords: [
      "combining pain relief labour",
      "mixed pain relief birth",
      "pain relief options together",
      "labour pain management plan",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Remifentanil PCA: an alternative to epidural",
    category: "pain-relief",
    keywords: [
      "remifentanil PCA",
      "patient controlled analgesia",
      "remifentanil labour",
      "alternative to epidural",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Massage and aromatherapy during labour",
    category: "pain-relief",
    keywords: [
      "massage labour",
      "aromatherapy birth",
      "essential oils labour",
      "partner massage birth",
    ],
    searchIntent: "informational",
  },

  // ==========================================
  // LABOUR & BIRTH (25 topics)
  // ==========================================
  {
    topic: "Signs of labour: how to know it's starting",
    category: "labour-and-birth",
    keywords: [
      "signs of labour",
      "how to know labour starting",
      "early labour signs",
      "is this labour",
    ],
    searchIntent: "informational",
  },
  {
    topic: "When to go to hospital or call your midwife",
    category: "labour-and-birth",
    keywords: [
      "when to go hospital labour",
      "when to call midwife",
      "labour hospital timing",
      "when to leave for hospital",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding the stages of labour",
    category: "labour-and-birth",
    keywords: [
      "stages of labour",
      "first stage labour",
      "second stage labour",
      "three stages birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "What happens during a vaginal examination",
    category: "labour-and-birth",
    keywords: [
      "vaginal examination labour",
      "internal examination birth",
      "cervix check labour",
      "VE in labour",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Induction of labour: methods used in NHS hospitals",
    category: "labour-and-birth",
    keywords: [
      "induction of labour",
      "being induced",
      "labour induction methods",
      "IOL NHS",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Membrane sweep: what to expect",
    category: "labour-and-birth",
    keywords: [
      "membrane sweep",
      "stretch and sweep",
      "cervical sweep",
      "sweep to start labour",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Breaking your waters (ARM): what you should know",
    category: "labour-and-birth",
    keywords: [
      "ARM procedure",
      "breaking waters",
      "artificial rupture membranes",
      "amniotomy",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Using a syntocinon drip for augmentation",
    category: "labour-and-birth",
    keywords: [
      "syntocinon drip",
      "pitocin UK",
      "augmentation labour",
      "speeding up labour",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding fetal monitoring during labour",
    category: "labour-and-birth",
    keywords: [
      "fetal monitoring",
      "CTG labour",
      "baby heart monitoring",
      "continuous monitoring birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Episiotomy: what it is and when it's needed",
    category: "labour-and-birth",
    keywords: [
      "episiotomy",
      "cutting during birth",
      "perineal cut",
      "episiotomy recovery",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Assisted birth: forceps and ventouse explained",
    category: "labour-and-birth",
    keywords: [
      "forceps delivery",
      "ventouse birth",
      "assisted delivery",
      "instrumental birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Caesarean section: what to expect before, during, and after",
    category: "labour-and-birth",
    keywords: [
      "caesarean section",
      "c-section UK",
      "what happens during c-section",
      "caesarean birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Emergency vs planned caesarean: understanding the difference",
    category: "labour-and-birth",
    keywords: [
      "emergency caesarean",
      "planned c-section",
      "elective caesarean",
      "categories of caesarean",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Skin-to-skin contact: why it matters",
    category: "labour-and-birth",
    keywords: [
      "skin to skin",
      "immediate skin contact",
      "kangaroo care",
      "skin to skin benefits",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Delayed cord clamping: the evidence and your options",
    category: "labour-and-birth",
    keywords: [
      "delayed cord clamping",
      "optimal cord clamping",
      "when to cut cord",
      "cord blood benefits",
    ],
    searchIntent: "informational",
  },
  {
    topic: "The third stage of labour explained",
    category: "labour-and-birth",
    keywords: [
      "third stage labour",
      "delivering placenta",
      "afterbirth",
      "placenta delivery",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Active vs physiological third stage: making your choice",
    category: "labour-and-birth",
    keywords: [
      "active management third stage",
      "physiological third stage",
      "natural placenta delivery",
      "managed third stage",
    ],
    searchIntent: "informational",
  },
  {
    topic: "What happens if you tear during birth",
    category: "labour-and-birth",
    keywords: [
      "perineal tear",
      "tearing during birth",
      "tear grades",
      "perineal injury birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Retained placenta: what it means and what happens next",
    category: "labour-and-birth",
    keywords: [
      "retained placenta",
      "placenta not coming out",
      "manual removal placenta",
      "stuck placenta",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding cord prolapse and what to do",
    category: "labour-and-birth",
    keywords: [
      "cord prolapse",
      "umbilical cord prolapse",
      "cord presentation",
      "emergency cord prolapse",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Meconium in your waters: what it means",
    category: "labour-and-birth",
    keywords: [
      "meconium waters",
      "meconium stained liquor",
      "baby poo in waters",
      "green waters labour",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Premature labour: what to expect if baby comes early",
    category: "labour-and-birth",
    keywords: [
      "premature labour",
      "preterm birth",
      "baby born early",
      "premature delivery",
    ],
    searchIntent: "informational",
  },
  {
    topic: "The golden hour after birth",
    category: "labour-and-birth",
    keywords: [
      "golden hour birth",
      "first hour after birth",
      "immediate postpartum",
      "after baby born",
    ],
    searchIntent: "informational",
  },
  {
    topic: "What happens if labour stalls",
    category: "labour-and-birth",
    keywords: [
      "labour not progressing",
      "stalled labour",
      "slow labour",
      "failure to progress",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Back-to-back labour: OP position explained",
    category: "labour-and-birth",
    keywords: [
      "back to back labour",
      "OP baby",
      "posterior position",
      "occiput posterior",
    ],
    searchIntent: "informational",
  },

  // ==========================================
  // POSTNATAL CARE (22 topics)
  // ==========================================
  {
    topic: "Your first 24 hours after birth",
    category: "postnatal-care",
    keywords: [
      "first day after birth",
      "first 24 hours postpartum",
      "after baby born",
      "immediate postpartum",
    ],
    searchIntent: "informational",
  },
  {
    topic: "The postnatal ward: what to expect",
    category: "postnatal-care",
    keywords: [
      "postnatal ward",
      "hospital after birth",
      "maternity ward stay",
      "after birth hospital",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Going home after birth: when and how",
    category: "postnatal-care",
    keywords: [
      "going home after birth",
      "discharge from hospital",
      "leaving hospital baby",
      "when can I go home after birth",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Your 5-day postnatal check: what happens",
    category: "postnatal-care",
    keywords: [
      "5 day check",
      "newborn examination",
      "day 5 midwife visit",
      "postnatal check baby",
    ],
    searchIntent: "informational",
  },
  {
    topic: "The heel prick test: why we do it and what it screens for",
    category: "postnatal-care",
    keywords: [
      "heel prick test",
      "newborn blood spot",
      "Guthrie test",
      "newborn screening UK",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Weighing your baby: understanding weight loss and gain",
    category: "postnatal-care",
    keywords: [
      "newborn weight loss",
      "baby weight gain",
      "normal weight loss newborn",
      "baby not gaining weight",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Vitamin K for newborns: your options explained",
    category: "postnatal-care",
    keywords: [
      "vitamin K injection",
      "vitamin K newborn",
      "VKDB prevention",
      "vitamin K oral",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Community midwife visits: what to expect",
    category: "postnatal-care",
    keywords: [
      "community midwife visits",
      "postnatal visits",
      "midwife home visit",
      "how many midwife visits",
    ],
    searchIntent: "informational",
  },
  {
    topic: "When you're discharged to your health visitor",
    category: "postnatal-care",
    keywords: [
      "health visitor",
      "discharged from midwife",
      "health visitor role",
      "postnatal discharge",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Making your 6-week GP appointment",
    category: "postnatal-care",
    keywords: [
      "6 week check mum",
      "postnatal GP appointment",
      "6 week postnatal check",
      "maternal 6 week check",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Your 6-week postnatal check: what's covered",
    category: "postnatal-care",
    keywords: [
      "6 week postnatal check",
      "6 week review",
      "postnatal check-up",
      "six week check mother",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Baby's 6-8 week check: what to expect",
    category: "postnatal-care",
    keywords: [
      "6 week baby check",
      "8 week baby check",
      "newborn baby check-up",
      "baby 6 week examination",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Registering your baby's birth: how and when",
    category: "postnatal-care",
    keywords: [
      "register birth",
      "birth certificate UK",
      "registering baby",
      "register of births",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Recovering from a vaginal birth",
    category: "postnatal-care",
    keywords: [
      "vaginal birth recovery",
      "recovery after birth",
      "postpartum recovery",
      "healing after vaginal delivery",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Recovering from a caesarean section",
    category: "postnatal-care",
    keywords: [
      "c-section recovery",
      "caesarean recovery time",
      "after c-section",
      "healing after caesarean",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding lochia: postnatal bleeding",
    category: "postnatal-care",
    keywords: [
      "lochia",
      "postnatal bleeding",
      "bleeding after birth",
      "how long does lochia last",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Caring for stitches after birth",
    category: "postnatal-care",
    keywords: [
      "stitches after birth",
      "perineal care",
      "episiotomy stitches",
      "looking after stitches postpartum",
    ],
    searchIntent: "informational",
  },
  {
    topic: "When to worry: signs of infection after birth",
    category: "postnatal-care",
    keywords: [
      "infection after birth",
      "wound infection signs",
      "c-section infection",
      "postpartum infection symptoms",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Postnatal warning signs: when to seek help",
    category: "postnatal-care",
    keywords: [
      "postnatal warning signs",
      "when to call doctor postpartum",
      "postpartum red flags",
      "postnatal emergency signs",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Your pelvic floor after birth",
    category: "postnatal-care",
    keywords: [
      "pelvic floor after birth",
      "pelvic floor exercises",
      "kegel exercises postpartum",
      "weak pelvic floor",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Afterpains: what they are and how to manage them",
    category: "postnatal-care",
    keywords: [
      "afterpains",
      "uterus contractions after birth",
      "cramping after birth",
      "postpartum cramps",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Getting enough rest with a newborn",
    category: "postnatal-care",
    keywords: [
      "rest with newborn",
      "sleep when baby sleeps",
      "new mum rest",
      "postnatal fatigue",
    ],
    searchIntent: "informational",
  },

  // ==========================================
  // BREASTFEEDING & FEEDING (17 topics)
  // ==========================================
  {
    topic: "Getting started with breastfeeding",
    category: "breastfeeding-and-feeding",
    keywords: [
      "starting breastfeeding",
      "how to breastfeed",
      "breastfeeding beginners",
      "first time breastfeeding",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Colostrum: your baby's first milk",
    category: "breastfeeding-and-feeding",
    keywords: [
      "colostrum",
      "first milk",
      "liquid gold",
      "colostrum benefits",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding your milk coming in",
    category: "breastfeeding-and-feeding",
    keywords: [
      "milk coming in",
      "breast milk supply",
      "when does milk come in",
      "transitional milk",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Common breastfeeding challenges and solutions",
    category: "breastfeeding-and-feeding",
    keywords: [
      "breastfeeding problems",
      "breastfeeding difficulties",
      "breastfeeding issues",
      "trouble breastfeeding",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Breast engorgement: what helps",
    category: "breastfeeding-and-feeding",
    keywords: [
      "breast engorgement",
      "engorged breasts",
      "swollen breasts breastfeeding",
      "engorgement relief",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Mastitis: signs, treatment, and prevention",
    category: "breastfeeding-and-feeding",
    keywords: [
      "mastitis",
      "breast infection",
      "mastitis symptoms",
      "mastitis treatment",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Formula feeding: a practical guide",
    category: "breastfeeding-and-feeding",
    keywords: [
      "formula feeding",
      "bottle feeding baby",
      "infant formula",
      "how to formula feed",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Combination feeding: breast and bottle",
    category: "breastfeeding-and-feeding",
    keywords: [
      "combination feeding",
      "mixed feeding",
      "breast and bottle",
      "supplementing with formula",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Expressing and storing breast milk",
    category: "breastfeeding-and-feeding",
    keywords: [
      "expressing breast milk",
      "pumping milk",
      "storing breast milk",
      "breast pump",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Feeding on demand vs scheduled feeding",
    category: "breastfeeding-and-feeding",
    keywords: [
      "feeding on demand",
      "responsive feeding",
      "scheduled feeding",
      "baby feeding routine",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Cluster feeding: what it is and why babies do it",
    category: "breastfeeding-and-feeding",
    keywords: [
      "cluster feeding",
      "baby feeding constantly",
      "frequent feeding",
      "cluster feeding normal",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Growth spurts and feeding patterns",
    category: "breastfeeding-and-feeding",
    keywords: [
      "baby growth spurt",
      "growth spurt feeding",
      "baby feeding more",
      "wonder weeks feeding",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Night feeding: survival tips",
    category: "breastfeeding-and-feeding",
    keywords: [
      "night feeding",
      "night feeds",
      "feeding baby at night",
      "night feeding tips",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Breastfeeding support in the NHS",
    category: "breastfeeding-and-feeding",
    keywords: [
      "breastfeeding support NHS",
      "breastfeeding help",
      "lactation consultant NHS",
      "infant feeding support",
    ],
    searchIntent: "informational",
  },
  {
    topic: "When breastfeeding doesn't work out",
    category: "breastfeeding-and-feeding",
    keywords: [
      "stopping breastfeeding",
      "breastfeeding not working",
      "unable to breastfeed",
      "breastfeeding guilt",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Tongue tie: what it is and how it affects feeding",
    category: "breastfeeding-and-feeding",
    keywords: [
      "tongue tie",
      "tongue tie baby",
      "ankyloglossia",
      "tongue tie division",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Breastfeeding positions and latching",
    category: "breastfeeding-and-feeding",
    keywords: [
      "breastfeeding positions",
      "how to latch baby",
      "breastfeeding hold",
      "getting good latch",
    ],
    searchIntent: "informational",
  },

  // ==========================================
  // BABY CARE (12 topics)
  // ==========================================
  {
    topic: "Understanding your newborn's cues",
    category: "baby-care",
    keywords: [
      "newborn cues",
      "baby hunger cues",
      "reading baby signals",
      "baby communication",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Safe sleep guidelines for babies",
    category: "baby-care",
    keywords: [
      "safe sleep baby",
      "SIDS prevention",
      "baby sleeping position",
      "safe sleep UK",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Bathing your newborn baby",
    category: "baby-care",
    keywords: [
      "bathing newborn",
      "baby bath",
      "how to bath baby",
      "newborn bath temperature",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Umbilical cord care for newborns",
    category: "baby-care",
    keywords: [
      "umbilical cord care",
      "cord stump",
      "cleaning umbilical cord",
      "when does cord fall off",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Jaundice in newborns: what parents need to know",
    category: "baby-care",
    keywords: [
      "newborn jaundice",
      "baby jaundice",
      "jaundice treatment",
      "yellow baby",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Signs of an unwell baby: when to seek help",
    category: "baby-care",
    keywords: [
      "unwell baby signs",
      "sick baby symptoms",
      "when to call doctor baby",
      "baby illness warning signs",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Nappy changing: a practical guide",
    category: "baby-care",
    keywords: [
      "nappy changing",
      "how to change nappy",
      "diaper change",
      "newborn nappy",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Baby's first weeks: what's normal",
    category: "baby-care",
    keywords: [
      "first weeks baby",
      "newborn normal",
      "what to expect newborn",
      "new baby first week",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Bonding with your newborn",
    category: "baby-care",
    keywords: [
      "bonding with baby",
      "newborn bonding",
      "attachment baby",
      "connecting with newborn",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Tummy time: when and how to start",
    category: "baby-care",
    keywords: [
      "tummy time",
      "baby tummy time",
      "when to start tummy time",
      "tummy time tips",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Understanding baby reflexes",
    category: "baby-care",
    keywords: [
      "newborn reflexes",
      "baby reflexes",
      "rooting reflex",
      "moro reflex",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Dressing your baby for different temperatures",
    category: "baby-care",
    keywords: [
      "dressing baby",
      "baby clothing layers",
      "baby overheating",
      "how to dress newborn",
    ],
    searchIntent: "informational",
  },

  // ==========================================
  // EMOTIONAL WELLBEING (12 topics)
  // ==========================================
  {
    topic: "Baby blues vs postnatal depression: knowing the difference",
    category: "emotional-wellbeing",
    keywords: [
      "baby blues",
      "postnatal depression",
      "postpartum depression",
      "PND symptoms",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Processing a difficult birth experience",
    category: "emotional-wellbeing",
    keywords: [
      "difficult birth",
      "traumatic birth",
      "processing birth",
      "birth debrief",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Birth trauma: recognising it and getting support",
    category: "emotional-wellbeing",
    keywords: [
      "birth trauma",
      "PTSD birth",
      "traumatic birth support",
      "birth trauma help",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Anxiety during pregnancy and after birth",
    category: "emotional-wellbeing",
    keywords: [
      "pregnancy anxiety",
      "postnatal anxiety",
      "perinatal anxiety",
      "anxious new mum",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Perinatal mental health support in the NHS",
    category: "emotional-wellbeing",
    keywords: [
      "perinatal mental health",
      "NHS mental health pregnancy",
      "perinatal team",
      "mental health support new mum",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Supporting your partner after birth",
    category: "emotional-wellbeing",
    keywords: [
      "supporting partner baby",
      "new dad support",
      "partner after birth",
      "paternal mental health",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Adjusting to life as a new parent",
    category: "emotional-wellbeing",
    keywords: [
      "adjusting to parenthood",
      "new parent transition",
      "becoming a parent",
      "life with newborn",
    ],
    searchIntent: "informational",
  },
  {
    topic: "When birth doesn't go to plan",
    category: "emotional-wellbeing",
    keywords: [
      "birth plan not followed",
      "birth disappointment",
      "birth didn't go to plan",
      "birth expectations",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Self-care for new mothers",
    category: "emotional-wellbeing",
    keywords: [
      "new mum self-care",
      "postnatal self-care",
      "self-care after birth",
      "looking after yourself new baby",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Building your support network",
    category: "emotional-wellbeing",
    keywords: [
      "support network baby",
      "new parent support",
      "mum groups",
      "finding support new mum",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Tokophobia: understanding fear of childbirth",
    category: "emotional-wellbeing",
    keywords: [
      "tokophobia",
      "fear of childbirth",
      "scared of giving birth",
      "fear of labour",
    ],
    searchIntent: "informational",
  },
  {
    topic: "Preparing emotionally for birth",
    category: "emotional-wellbeing",
    keywords: [
      "emotional preparation birth",
      "mentally preparing for birth",
      "birth anxiety",
      "preparing mind for labour",
    ],
    searchIntent: "informational",
  },
];

// Helper function to get a random uncovered topic
export function getRandomUncoveredTopic(
  coveredTopics: string[]
): BlogTopic | null {
  const coveredSet = new Set(coveredTopics.map((t) => t.toLowerCase()));
  const uncoveredTopics = BLOG_TOPICS.filter(
    (t) => !coveredSet.has(t.topic.toLowerCase())
  );

  if (uncoveredTopics.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * uncoveredTopics.length);
  return uncoveredTopics[randomIndex];
}

// Helper function to get topics by category
export function getTopicsByCategory(category: BlogCategory): BlogTopic[] {
  return BLOG_TOPICS.filter((t) => t.category === category);
}

// Get total topic count
export function getTotalTopicCount(): number {
  return BLOG_TOPICS.length;
}

// Get coverage stats
export function getCoverageStats(coveredTopics: string[]): {
  total: number;
  covered: number;
  remaining: number;
  percentCovered: number;
} {
  const coveredSet = new Set(coveredTopics.map((t) => t.toLowerCase()));
  const covered = BLOG_TOPICS.filter((t) =>
    coveredSet.has(t.topic.toLowerCase())
  ).length;

  return {
    total: BLOG_TOPICS.length,
    covered,
    remaining: BLOG_TOPICS.length - covered,
    percentCovered: Math.round((covered / BLOG_TOPICS.length) * 100),
  };
}
