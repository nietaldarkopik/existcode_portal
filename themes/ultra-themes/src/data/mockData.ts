import { ServiceItem, ProductItem, NewsArticle, BlogPost, ReactorNode } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Quantum Synapse Cloud',
    category: 'Hyper-Compute Architecture',
    tagline: 'Sub-nanosecond AI tensor orchestration with sub-atomic memory coherence.',
    description: 'Deploy distributed neural pipelines across 100,000+ liquid-cooled quantum nodes in less than 40 milliseconds.',
    iconName: 'Cpu',
    accentColor: 'blue',
    gridSpan: 'col-span-12 lg:col-span-8',
    stats: [
      { label: 'Latency', value: '0.04ms', change: '-94%' },
      { label: 'Throughput', value: '18.4 PFLOPS', change: '+320%' },
      { label: 'Efficiency', value: '99.999%', change: '+0.02%' }
    ],
    features: [
      'Sub-atomic memory sharing via entanglement protocols',
      'Zero-copy tensor stream buffers',
      'Automated dark fiber node failover',
      'Real-time neural weight heatmaps'
    ],
    latency: '0.04ms',
    throughput: '18.4 PFLOPS'
  },
  {
    id: 'srv-2',
    title: 'Holographic Shield Zero',
    category: 'Cyber-Defensive Fabric',
    tagline: 'Autonomous AI defense mesh intercepting zero-day threats in real-time.',
    description: 'Self-healing cryptographic barriers powered by adaptive neural prediction models with zero false positives.',
    iconName: 'ShieldZap',
    accentColor: 'purple',
    gridSpan: 'col-span-12 lg:col-span-4',
    stats: [
      { label: 'Threat Mitigation', value: '< 1µs', change: 'Instant' },
      { label: 'Active Barriers', value: '4.2M', change: '+12%' }
    ],
    features: [
      'Real-time quantum state memory inspection',
      'Adaptive honey-net node projection',
      'Automated threat isolation'
    ],
    latency: '0.001ms',
    throughput: '100 Tbps'
  },
  {
    id: 'srv-3',
    title: 'Hyper-Flux Database Matrix',
    category: 'Distributed Relational State',
    tagline: 'Multi-region transactional memory with infinite horizontal scale.',
    description: 'Consensus-free ACID state replication built on topological fiber arrays and optical state mirrors.',
    iconName: 'Database',
    accentColor: 'teal',
    gridSpan: 'col-span-12 lg:col-span-4',
    stats: [
      { label: 'Write Operations', value: '25M/sec', change: '+140%' },
      { label: 'Data Replicas', value: 'Infini-Mesh', change: 'Global' }
    ],
    features: [
      'Optical memory mirroring',
      'Zero-downtime schema evolution',
      'Time-travel temporal queries'
    ],
    latency: '0.12ms',
    throughput: '25M Ops/s'
  },
  {
    id: 'srv-4',
    title: 'Orbital Neural Telemetry',
    category: 'Deep Observer Network',
    tagline: 'Real-time multi-spectrum cluster observability with predictive anomaly detection.',
    description: 'Generative insight engine rendering 3D spatial topographies of every thread, memory address, and I/O bus.',
    iconName: 'Radio',
    accentColor: 'pink',
    gridSpan: 'col-span-12 lg:col-span-8',
    stats: [
      { label: 'Telemetry Streams', value: '1.2B/sec', change: '+45%' },
      { label: 'Prediction Accuracy', value: '99.98%', change: '+0.5%' },
      { label: 'Mean Resolution', value: '1.2s', change: '-80%' }
    ],
    features: [
      '3D Holographic thread stack visualizations',
      'Predictive kernel panic intervention',
      'Custom spatial query language (S-SQL)',
      'Sub-millisecond trace aggregation'
    ],
    latency: '0.08ms',
    throughput: '1.2B Evt/s'
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Nexus X-9000 Quantum Processor',
    series: 'Ultra-Core Titan',
    price: 14999.00,
    priceChange: 2.4,
    stock: 14,
    rating: 4.98,
    image: '/src/assets/images/quantum_processor_1786122231681.jpg',
    accentColor: 'blue',
    isHot: true,
    description: '256 Qubit hybrid optical-silicon processor with cryogenic liquid thermal chamber and sub-picosecond clock synchronization.',
    specs: {
      'Qubit Count': '256 Entangled',
      'Clock Speed': '12.8 GHz Equivalent',
      'Thermal Design Power': '350W Supercooled',
      'Coherence Time': '850 microseconds',
      'Bus Interface': 'PCIe Gen 6.0 x64'
    }
  },
  {
    id: 'prod-2',
    name: 'Neural Node Matrix Sphere v4',
    series: 'Synapse Core',
    price: 8450.00,
    priceChange: -1.2,
    stock: 29,
    rating: 4.92,
    image: '/src/assets/images/neural_node_1786122248205.jpg',
    accentColor: 'purple',
    description: 'Holographic optical neural network unit equipped with 1024 tensor processing arrays for edge AI inference.',
    specs: {
      'Tensor Engines': '1024 Cores',
      'Memory Bandwidth': '12.8 TB/s',
      'Neural Precision': 'FP8 / INT4 Hybrid',
      'Power Drain': '180W Active',
      'Form Factor': 'Sphere Pod v4'
    }
  },
  {
    id: 'prod-3',
    name: 'Hyper-Flux Optical Transceiver',
    series: 'Photon Beam',
    price: 3200.00,
    priceChange: 5.1,
    stock: 8,
    rating: 4.95,
    image: '/src/assets/images/nexus_hero_bg_1786122217365.jpg',
    accentColor: 'teal',
    isHot: true,
    description: '800Gbps laser-interconnected optical link module with integrated quantum noise reduction and zero frame drop guarantee.',
    specs: {
      'Data Rate': '800 Gbps Full Duplex',
      'Wavelength': '1550nm Laser Beam',
      'Max Reach': '40 km Zero Loss',
      'Latency Overhead': '0.0001 ms',
      'Encryption': 'Post-Quantum Kyber-1024'
    }
  },
  {
    id: 'prod-4',
    name: 'Holographic Memory Module 2TB',
    series: 'Crystalline Storage',
    price: 4890.00,
    priceChange: 0.8,
    stock: 42,
    rating: 4.89,
    image: '/src/assets/images/neural_node_1786122248205.jpg',
    accentColor: 'pink',
    description: '3D Photonic crystal lattice memory storage offering near-instantaneous read access across 2 Terrabytes of volumetric space.',
    specs: {
      'Capacity': '2.0 TB Volumetric',
      'Read Speed': '420 GB/s',
      'Write Speed': '380 GB/s',
      'Endurance': 'Infinite Photonic Rewrites',
      'Retention': '100+ Years'
    }
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'NexusCore Breaks World Record with 100 PFLOPS Quantum Mesh',
    subtitle: 'The new sub-atomic interconnect protocol reduces inter-node jitter to near-zero.',
    category: 'BREAKING BENCHMARK',
    readTime: '3 MIN READ',
    date: 'AUGUST 07, 2026',
    author: 'Dr. Valerius Vance, Chief Quantum Architect',
    image: '/src/assets/images/nexus_hero_bg_1786122217365.jpg',
    summary: 'Our engineering teams have demonstrated full linear scaling across 100,000 hybrid quantum tensor nodes without packet degradation.',
    fullText: 'In a groundbreaking live demonstration streamed to over 400 enterprise research labs worldwide, NexusCore Ultra achieved 100 PFLOPS of sustained tensor processing. By combining laser photonic interconnects with cryogenic quantum state stabilizers, thermal dissipation was reduced by 64% while throughput surged threefold.',
    tags: ['Quantum Computing', 'Benchmarks', 'Supercomputing', 'Hardware'],
    trending: true
  },
  {
    id: 'news-2',
    title: 'Introducing Holographic Shield v5: Autonomous Neural Defense',
    subtitle: 'Zero-day mitigation operates at the picosecond timeline before exploits touch user memory.',
    category: 'CYBERSECURITY',
    readTime: '5 MIN READ',
    date: 'AUGUST 05, 2026',
    author: 'Aria Thorne, Head of Security Synthetics',
    image: '/src/assets/images/neural_node_1786122248205.jpg',
    summary: 'Holographic Shield v5 isolates adversarial payload signatures by simulating millions of micro-sandbox parallel realities.',
    fullText: 'Traditional firewalls and static intrusion detection systems are rendered obsolete by polymorphic machine-generated exploits. Holographic Shield v5 introduces Predictive State Reflection, continuously modeling prospective kernel executions and neutralizing malicious code vectors before instruction pipelines fire.',
    tags: ['Cybersecurity', 'AI Shield', 'Zero-Trust', 'Neural Defense'],
    trending: true
  },
  {
    id: 'news-3',
    title: 'Next-Gen Liquid Cooling Chambers Cut Data Center Power by 78%',
    subtitle: 'Eco-thermal fluorocarbon circulation maintains sub-zero core operations with minimal energy waste.',
    category: 'SUSTAINABILITY',
    readTime: '4 MIN READ',
    date: 'AUGUST 02, 2026',
    author: 'Kaelen Thorne, Green Grid Lead',
    image: '/src/assets/images/quantum_processor_1786122231681.jpg',
    summary: 'NexusCore deployable liquid-immersion chassis units deliver unprecedented PUE scores under 1.02.',
    fullText: 'As AI workload densities reach 200kW per rack, standard air or cold-plate liquid loops encounter physical limits. Our newly patented closed-loop two-phase fluorocarbon immersion technology allows hyperscale clusters to operate perpetually at peak boost frequencies with zero thermal throttling.',
    tags: ['Green Tech', 'Thermal Fluid', 'Hardware Efficiency'],
    trending: false
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Architecture of Sub-Picosecond Fiber Synchronization',
    excerpt: 'How optical atomic clocks enable unified distributed state across multi-continent clusters.',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Principal Fiber Physicist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    date: 'AUG 06',
    readTime: '6 MIN',
    color: 'blue',
    tags: ['Distributed Systems', 'Photons', 'Clock Sync']
  },
  {
    id: 'blog-2',
    title: 'Designing Zero-Copy Tensor Streams in Hybrid React Engine',
    excerpt: 'Optimizing memory pipelines between WebGL shaders and WebGPU computing buffers.',
    author: {
      name: 'Marcus Chen',
      role: 'Lead UI/UX Engine Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    date: 'AUG 04',
    readTime: '8 MIN',
    color: 'purple',
    tags: ['WebGPU', 'Front-End High Tech', 'Performance']
  },
  {
    id: 'blog-3',
    title: 'Post-Quantum Cryptography: Surviving the Q-Day Singularity',
    excerpt: 'Migrating enterprise key infrastructures to lattice-based Kyber and Dilithium schemes.',
    author: {
      name: 'Soren Lindqvist',
      role: 'Quantum Cryptographer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    date: 'AUG 01',
    readTime: '5 MIN',
    color: 'teal',
    tags: ['Encryption', 'Quantum Safe', 'Protocols']
  },
  {
    id: 'blog-4',
    title: 'Holographic User Experience & The Z-Axis Spatial UI Paradigm',
    excerpt: 'Moving beyond flat rectangular cards into volumetric glass depth and dynamic glowing light.',
    author: {
      name: 'Zara Vance',
      role: 'Chief Design Futurist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    date: 'JUL 28',
    readTime: '7 MIN',
    color: 'pink',
    tags: ['Spatial UI', 'Modern Brutalism', 'Design Language']
  },
  {
    id: 'blog-5',
    title: 'Autonomous Synthetic Agents in Large-Scale Infrastructure',
    excerpt: 'How self-governing AI agents diagnose and patch server bottlenecks before alerts fire.',
    author: {
      name: 'Alexei Ivanov',
      role: 'Autonomous Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    },
    date: 'JUL 25',
    readTime: '10 MIN',
    color: 'blue',
    tags: ['Autonomous AI', 'Infrastructure', 'Self-Healing']
  }
];

export const REACTOR_NODES: ReactorNode[] = [
  {
    id: 'node-core',
    name: 'Quantum Core',
    type: 'core',
    x: 50,
    y: 50,
    status: 'overclocked',
    load: 88,
    capacity: '100 PFLOPS',
    accent: '#3b82f6', // Electric Blue
    connectedTo: ['node-memory', 'node-engine-1', 'node-engine-2', 'node-edge']
  },
  {
    id: 'node-memory',
    name: 'Synapse Cache',
    type: 'memory',
    x: 22,
    y: 28,
    status: 'active',
    load: 64,
    capacity: '12.8 TB/s',
    accent: '#a855f7', // Electric Purple
    connectedTo: ['node-core', 'node-engine-1']
  },
  {
    id: 'node-engine-1',
    name: 'Tensor Engine Alpha',
    type: 'engine',
    x: 78,
    y: 28,
    status: 'active',
    load: 92,
    capacity: '42.0 TFLOPS',
    accent: '#06b6d4', // Cyber Teal
    connectedTo: ['node-core', 'node-edge']
  },
  {
    id: 'node-engine-2',
    name: 'Neural Matrix Beta',
    type: 'engine',
    x: 22,
    y: 72,
    status: 'optimizing',
    load: 45,
    capacity: '38.5 TFLOPS',
    accent: '#ec4899', // Hot Pink
    connectedTo: ['node-core', 'node-edge']
  },
  {
    id: 'node-edge',
    name: 'Orbital Edge Mesh',
    type: 'edge',
    x: 78,
    y: 72,
    status: 'active',
    load: 71,
    capacity: '100 Gbps',
    accent: '#3b82f6',
    connectedTo: ['node-core']
  }
];

export const TICKER_MESSAGES = [
  '⚡ NEXUSCORE v4.2 DEPLOYED: ZERO-LATENCY QUANTUM MESH IS NOW LIVE WORLDWIDE',
  '🔥 RECORD PERFORMANCE: 18.4 PFLOPS SUSTAINED ON QUANTUM SYNAPSE CLOUD',
  '🛡️ HOLOGRAPHIC SHIELD V5 INTERCEPTED 4.2 MILLION SYNTHETIC ZERO-DAYS TODAY',
  '💎 NEW QUANTUM PROCESSOR X-9000 IN STOCK - ONLY 14 NODES REMAINING IN TOKYO HUB',
  '🌐 ORBITAL NEURAL MESH LATENCY REDUCED TO 0.04ms ACROSS NORTH AMERICA & EMEA'
];
