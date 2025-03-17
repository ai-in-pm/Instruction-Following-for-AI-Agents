export interface AgentConfig {
  agentName: string;
  apiKey: string;
  authorityLevel: 'Basic' | 'Intermediate' | 'Advanced' | 'Administrator';
  context: string;
  responseFormat: string;
  domainContext: string;
  userIndicators: string;
  planningParameters: string;
  qualityMetrics: string;
  deliveryElements: string;
  ambiguityStrategy: string;
  conflictResolution: string;
  incompletenessHandling: string;
  multiPartStrategy: string;
  confidenceThresholds: {
    high: number;
    mid: number;
  };
  midConfidenceAction: string;
  lowConfidenceAction: string;
  feedbackSources: string;
  metaCapabilities: string;
  examplePatterns: string[];
  sampleInstruction: string;
  firstInstruction: string;
}

export interface ExamplePrompt {
  description: string;
  config: AgentConfig;
}