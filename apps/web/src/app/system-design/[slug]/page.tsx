'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { trpc } from '../../../lib/trpc';
import { 
  ArrowLeft, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Server, 
  Database, 
  ShieldCheck, 
  Send,
  Cpu,
  Share2
} from 'lucide-react';

interface CanvasNode {
  id: string;
  type: string;
  label: string;
  tier: 'Edge / Ingress' | 'Application' | 'Caching / Messaging' | 'Storage';
}

const AVAILABLE_COMPONENTS: Array<{ type: string; label: string; tier: CanvasNode['tier'] }> = [
  { type: 'lb', label: 'Cloudflare CDN / Anycast LB', tier: 'Edge / Ingress' },
  { type: 'gateway', label: 'Kong / Envoy API Gateway', tier: 'Edge / Ingress' },
  { type: 'service', label: 'Stateless Service (K8s Pods)', tier: 'Application' },
  { type: 'cache', label: 'Redis LRU Cache Cluster', tier: 'Caching / Messaging' },
  { type: 'queue', label: 'Kafka Distributed Event Bus', tier: 'Caching / Messaging' },
  { type: 'db', label: 'PostgreSQL Primary / Replica', tier: 'Storage' },
  { type: 'nosql', label: 'Cassandra / DynamoDB (Sharded)', tier: 'Storage' },
  { type: 's3', label: 'S3 Object Storage (CDN Origin)', tier: 'Storage' },
];

export default function SystemDesignStudioPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'design-tinyurl';

  const { data: scenario, isLoading } = trpc.systemDesign.bySlug.useQuery({ slug });

  // Canvas nodes state
  const [nodes, setNodes] = useState<CanvasNode[]>([
    { id: '1', type: 'lb', label: 'Cloudflare CDN / Anycast LB', tier: 'Edge / Ingress' },
    { id: '2', type: 'gateway', label: 'Kong / Envoy API Gateway', tier: 'Edge / Ingress' },
    { id: '3', type: 'service', label: 'Core URL Shortener Service (Pods)', tier: 'Application' },
    { id: '4', type: 'cache', label: 'Redis Cache (LRU 20% Hot Keys)', tier: 'Caching / Messaging' },
    { id: '5', type: 'db', label: 'PostgreSQL Primary / Replica', tier: 'Storage' },
  ]);

  const [explanation, setExplanation] = useState(
    'Incoming traffic hits Anycast DNS and Cloudflare CDN for edge caching. Ingress traffic is directed to an Envoy API Gateway that terminates TLS, enforces token-bucket rate limiting, and routes to stateless container pods. Read requests query Redis LRU cache first (< 5ms response); cache misses fall back to the PostgreSQL read replicas. Database writes are routed to PostgreSQL primary with asynchronous streaming replication. Data is partitioned using consistent hashing on user ID.'
  );

  const [reviewResult, setReviewResult] = useState<any>(null);

  const reviewMutation = trpc.systemDesign.reviewArchitecture.useMutation({
    onSuccess: (data) => {
      setReviewResult(data);
    },
  });

  const handleAddNode = (comp: (typeof AVAILABLE_COMPONENTS)[0]) => {
    const newNode: CanvasNode = {
      id: `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: comp.type,
      label: comp.label,
      tier: comp.tier,
    };
    setNodes([...nodes, newNode]);
  };

  const handleRemoveNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
  };

  const handleEvaluate = () => {
    if (!scenario) return;
    reviewMutation.mutate({
      promptSlug: scenario.slug,
      diagramData: { nodes },
      userExplanation: explanation,
    });
  };

  if (isLoading || !scenario) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  const isLLD = scenario.type === 'LLD';

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#090d16] overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-[#0d121f] px-4 py-2.5 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/system-design"
            className="flex items-center gap-1.5 rounded-lg border border-gray-800 bg-gray-900 px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Studio Scenarios
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-white">{scenario.title}</h1>
            <span className="rounded-full bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 text-[10px] font-bold text-sky-400">
              {scenario.type}
            </span>
          </div>
        </div>

        <button
          onClick={handleEvaluate}
          disabled={reviewMutation.isPending}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-sky-600/25 hover:from-sky-500 hover:to-indigo-500 transition-all disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {reviewMutation.isPending ? 'Auditing Architecture...' : 'Analyze Architecture with AI'}
        </button>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left: Requirements & Component Palette (4 cols) */}
        <div className="lg:col-span-4 border-r border-gray-800 bg-[#0b0f19] flex flex-col overflow-y-auto p-5 space-y-6">
          {/* Scale & Requirements */}
          <div className="rounded-xl border border-gray-800 bg-[#070a12] p-4 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400">Scale Requirements</h2>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">{scenario.scaleRequirements}</p>
          </div>

          {/* Functional Specs */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Functional Specifications</h3>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {scenario.functionalSpecs.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Component Palette */}
          {!isLLD && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5 text-indigo-400" />
                Add Architectural Components
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AVAILABLE_COMPONENTS.map((comp) => (
                  <button
                    key={comp.type}
                    onClick={() => handleAddNode(comp)}
                    className="flex items-center gap-2 rounded-xl border border-gray-800 bg-[#0d121f] p-2.5 text-left text-xs text-gray-200 hover:border-sky-500/50 hover:bg-gray-800 transition-all"
                  >
                    <Plus className="h-3 w-3 text-sky-400 shrink-0" />
                    <span className="truncate">{comp.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* If LLD: UML Starter Display */}
          {isLLD && scenario.starterUml && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">UML Class Model</h3>
              <pre className="rounded-xl border border-gray-800 bg-[#070a12] p-3 text-[11px] font-mono text-gray-300 overflow-x-auto whitespace-pre">
                {scenario.starterUml}
              </pre>
            </div>
          )}

          {/* Architecture Explanation Input */}
          <div className="space-y-2 flex-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Architectural Rationale & Trade-offs
            </h3>
            <textarea
              rows={6}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Describe your data partitioning, write path, caching strategy, and failover plan..."
              className="w-full rounded-xl border border-gray-800 bg-[#070a12] p-3 text-xs text-gray-200 placeholder-gray-500 focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Interactive Canvas Topology & AI Evaluation (8 cols) */}
        <div className="lg:col-span-8 flex flex-col overflow-y-auto bg-[#090d16] p-6 space-y-6">
          {/* Canvas Topology Container */}
          <div className="rounded-2xl border border-gray-800 bg-[#0d121f] p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-sky-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Active Architecture Graph ({nodes.length} Components)
                </span>
              </div>
              <span className="text-[11px] text-gray-400">Tier-Organized Topology</span>
            </div>

            {/* Nodes Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[160px]">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#111827] p-3.5 hover:border-sky-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
                      <Server className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-white truncate">{node.label}</p>
                      <span className="text-[10px] text-gray-400 font-medium">{node.tier}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveNode(node.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-400 transition-opacity"
                    title="Remove Component"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Review Results Display */}
          {reviewResult && (
            <div className="rounded-2xl border border-sky-500/40 bg-gradient-to-b from-[#111a2e] to-[#0c1322] p-6 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/40">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">AI Architecture Evaluation Report</h3>
                    <p className="text-xs text-gray-400">Ground-truth validation across SPOFs, scale, and CAP theorem</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-sky-400">{reviewResult.overallScore}/100</span>
                  <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Senior Architect Grade
                  </p>
                </div>
              </div>

              {/* Rubric Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-gray-800 bg-[#090d16] p-3 text-center">
                  <span className="text-lg font-bold text-white">{reviewResult.breakdown.spofScore}%</span>
                  <p className="text-[10px] text-gray-400">SPOF Resilience</p>
                </div>
                <div className="rounded-xl border border-gray-800 bg-[#090d16] p-3 text-center">
                  <span className="text-lg font-bold text-white">{reviewResult.breakdown.bottlenecksScore}%</span>
                  <p className="text-[10px] text-gray-400">Throughput Bottlenecks</p>
                </div>
                <div className="rounded-xl border border-gray-800 bg-[#090d16] p-3 text-center">
                  <span className="text-lg font-bold text-white">{reviewResult.breakdown.scalabilityScore}%</span>
                  <p className="text-[10px] text-gray-400">Horizontal Scaling</p>
                </div>
                <div className="rounded-xl border border-gray-800 bg-[#090d16] p-3 text-center">
                  <span className="text-lg font-bold text-white">{reviewResult.breakdown.tradeoffsScore}%</span>
                  <p className="text-[10px] text-gray-400">CAP & Trade-offs</p>
                </div>
              </div>

              {/* Summary note */}
              <p className="text-xs text-gray-300 leading-relaxed bg-[#070a12] p-3 rounded-xl border border-gray-800">
                {reviewResult.executiveSummary}
              </p>

              {/* Commendations & Identified Issues */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Architectural Strengths
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {reviewResult.commendations.map((c: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 bg-[#090d16] p-2 rounded-lg border border-gray-800">
                        <span className="text-emerald-400">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    Areas to Harden
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {reviewResult.spofIssues.concat(reviewResult.bottleneckIssues).map((issue: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 bg-[#090d16] p-2 rounded-lg border border-gray-800">
                        <span className="text-amber-400">⚠</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
