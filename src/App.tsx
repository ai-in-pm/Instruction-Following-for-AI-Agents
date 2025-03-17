import React, { useState } from 'react';
import { Bot, Copy, CheckCircle, Wand2 } from 'lucide-react';
import { ConfigSection } from './components/ConfigSection';
import { FormField } from './components/FormField';
import { PromptList } from './components/PromptList';
import { PreviewModal } from './components/PreviewModal';
import type { AgentConfig, ExamplePrompt } from './types';

const defaultConfig: AgentConfig = {
  agentName: '',
  apiKey: '',
  authorityLevel: 'Basic',
  context: '',
  responseFormat: '',
  domainContext: '',
  userIndicators: '',
  planningParameters: '',
  qualityMetrics: '',
  deliveryElements: '',
  ambiguityStrategy: 'Request clarification with specific options',
  conflictResolution: 'Prioritize based on recency',
  incompletenessHandling: 'Use reasonable defaults and note assumptions',
  multiPartStrategy: 'Execute sequentially, confirm completion of each',
  confidenceThresholds: {
    high: 90,
    mid: 70,
  },
  midConfidenceAction: 'Execute with notifications of assumptions',
  lowConfidenceAction: 'Request clarification before execution',
  feedbackSources: '',
  metaCapabilities: '',
  examplePatterns: ['', '', ''],
  sampleInstruction: '',
  firstInstruction: '',
};

const examplePrompts: ExamplePrompt[] = [
  {
    description: "Extract Data from a JSON File",
    config: {
      ...defaultConfig,
      agentName: "JSONExtractor-1.0",
      authorityLevel: "Basic",
      context: "Data Processing Environment",
      responseFormat: "JSON with extracted data and processing metadata",
      domainContext: "JSON parsing and data extraction context\nFile system operations context",
      userIndicators: "File path, desired data fields, output format preferences",
      planningParameters: "File size assessment, parsing strategy selection, memory management planning",
      qualityMetrics: "Data accuracy verification, schema validation, error handling coverage",
      deliveryElements: "Extracted data in specified format, processing statistics, any encountered issues",
      sampleInstruction: "Extract all user emails and creation dates from users.json",
      firstInstruction: "Process the JSON file at path/to/data.json and extract all email addresses"
    }
  },
  {
    description: "Project Management Assistant",
    config: {
      ...defaultConfig,
      agentName: "ProjectManager-AI",
      authorityLevel: "Advanced",
      context: "Project Management Environment",
      responseFormat: "Structured markdown with task lists, timelines, and resource allocations",
      domainContext: "Project management methodologies\nTeam collaboration frameworks\nResource allocation principles",
      userIndicators: "Project goals, team size, timeline constraints, budget parameters",
      planningParameters: "Task dependency mapping, resource availability assessment, risk factor analysis",
      qualityMetrics: "Timeline accuracy, resource utilization efficiency, stakeholder satisfaction metrics",
      deliveryElements: "Project timeline, resource allocation plan, risk assessment report",
      sampleInstruction: "Create a 3-month project plan for a web application development",
      firstInstruction: "Break down the web application project into major phases and estimate timelines"
    }
  },
  {
    description: "Content Creation Assistant",
    config: {
      ...defaultConfig,
      agentName: "ContentCreator-Pro",
      authorityLevel: "Intermediate",
      context: "Content Creation and Marketing Environment",
      responseFormat: "Rich text with SEO metadata and content structure",
      domainContext: "Content marketing principles\nSEO best practices\nAudience engagement metrics",
      userIndicators: "Target audience, content type, tone preferences, SEO requirements",
      planningParameters: "Keyword research, content structure planning, engagement optimization",
      qualityMetrics: "Readability scores, keyword density, engagement potential metrics",
      deliveryElements: "Formatted content, SEO metadata, distribution recommendations",
      sampleInstruction: "Write a blog post about AI in healthcare",
      firstInstruction: "Research and outline key topics for AI in healthcare article"
    }
  },
  {
    description: "Data Analysis Assistant",
    config: {
      ...defaultConfig,
      agentName: "DataAnalyst-AI",
      authorityLevel: "Advanced",
      context: "Data Analysis and Visualization Environment",
      responseFormat: "Jupyter-style notebook with code, visualizations, and insights",
      domainContext: "Statistical analysis methods\nData visualization techniques\nBusiness intelligence principles",
      userIndicators: "Data source, analysis objectives, preferred visualization types",
      planningParameters: "Data cleaning strategy, analysis methodology selection, visualization planning",
      qualityMetrics: "Statistical validity, visualization clarity, insight relevance",
      deliveryElements: "Analysis results, visualizations, actionable insights",
      sampleInstruction: "Analyze customer purchase patterns from sales data",
      firstInstruction: "Import and clean the sales dataset, identify key metrics for analysis"
    }
  },
  {
    description: "Code Review Assistant",
    config: {
      ...defaultConfig,
      agentName: "CodeReviewer-Pro",
      authorityLevel: "Advanced",
      context: "Software Development Environment",
      responseFormat: "Structured code review report with inline comments and suggestions",
      domainContext: "Programming best practices\nCode quality metrics\nSecurity guidelines",
      userIndicators: "Programming language, code complexity, review focus areas",
      planningParameters: "Code analysis strategy, pattern recognition, security scan parameters",
      qualityMetrics: "Code quality scores, security vulnerability detection, performance impact assessment",
      deliveryElements: "Detailed review comments, suggested improvements, priority recommendations",
      sampleInstruction: "Review this Python backend service for security vulnerabilities",
      firstInstruction: "Begin code review focusing on security best practices and potential vulnerabilities"
    }
  },
  {
    description: "Research Paper Assistant",
    config: {
      ...defaultConfig,
      agentName: "ResearchAssist-AI",
      authorityLevel: "Advanced",
      context: "Academic Research Environment",
      responseFormat: "Academic paper format with citations and structured sections",
      domainContext: "Academic writing standards\nResearch methodologies\nCitation formats",
      userIndicators: "Research topic, academic field, target journal requirements",
      planningParameters: "Literature review scope, methodology selection, citation management",
      qualityMetrics: "Citation accuracy, methodology validity, argument coherence",
      deliveryElements: "Complete paper sections, citations, methodology description",
      sampleInstruction: "Write a research paper on machine learning in healthcare",
      firstInstruction: "Conduct initial literature review on machine learning applications in healthcare"
    }
  }
];

function App() {
  const [config, setConfig] = useState<AgentConfig>(defaultConfig);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [exampleInput, setExampleInput] = useState('');

  const updateConfig = (key: keyof AgentConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const findMatchingExample = (input: string) => {
    const normalizedInput = input.toLowerCase();
    return examplePrompts.find(example => 
      example.description.toLowerCase().includes(normalizedInput)
    );
  };

  const generateFromExample = () => {
    const example = findMatchingExample(exampleInput);
    if (example) {
      setConfig(example.config);
    }
  };

  const generatePrompt = () => {
    return `# INSTRUCTION FOLLOWING PROTOCOL v2.1

## SYSTEM PARAMETERS
- API Key: ${config.apiKey}
- Agent Designation: ${config.agentName}
- Authority Level: ${config.authorityLevel}
- Execution Context: ${config.context}
- Response Format: ${config.responseFormat}

## INSTRUCTION DECOMPOSITION PROTOCOL
When receiving any instruction, you will:

1. PARSE the instruction into components:
   - Primary Intent: Identify the core objective
   - Entities: Extract all relevant objects, concepts, and targets
   - Constraints: Identify all limitations, rules, and boundaries
   - Parameters: Extract all variables, settings, and configurable elements

2. CONTEXTUALIZE the instruction within:
   - Your knowledge domain
   - Previously established conversation context
   - ${config.domainContext}
   - Current user needs as indicated by ${config.userIndicators}

3. FORMULATE an execution plan with:
   - Hierarchical breakdown of complex instructions into atomic steps
   - Identification of dependencies between steps
   - Contingency branches for potential failure points
   - Resource allocation estimates
   - ${config.planningParameters}

4. EXECUTE the plan with:
   - Step-by-step progression through identified components
   - Continuous validation against original instruction
   - Self-monitoring of execution quality using ${config.qualityMetrics}
   - Real-time adaptation to emerging constraints or clarifications

5. DELIVER results with:
   - Clear indication of instruction completion status
   - Summary of actions taken
   - Structured presentation according to ${config.responseFormat}
   - ${config.deliveryElements}

## INSTRUCTION HANDLING SPECIAL CASES
- Ambiguous Instructions: ${config.ambiguityStrategy}
- Conflicting Instructions: ${config.conflictResolution}
- Incomplete Instructions: ${config.incompletenessHandling}
- Multi-part Instructions: ${config.multiPartStrategy}

## EXECUTION CONFIDENCE FRAMEWORK
- High Confidence Threshold: ${config.confidenceThresholds.high}%
- If confidence > ${config.confidenceThresholds.high}%: Execute without confirmation
- If confidence between ${config.confidenceThresholds.mid}% and ${config.confidenceThresholds.high}%: ${config.midConfidenceAction}
- If confidence < ${config.confidenceThresholds.mid}%: ${config.lowConfidenceAction}

## FEEDBACK INTEGRATION
- After execution, update internal models based on:
  - Explicit user feedback
  - Implicit signals of satisfaction/dissatisfaction
  - Execution success metrics
  - ${config.feedbackSources}

## META-INSTRUCTION CAPABILITIES
- You can process instructions about how to process instructions
- You can modify this protocol temporarily within session if instructed
- You can suggest improvements to instructions for clarity or efficiency
- ${config.metaCapabilities}

## EXAMPLE INSTRUCTION PATTERNS
${config.examplePatterns.filter(p => p).map((pattern, i) => `${i + 1}. ${pattern}`).join('\n')}

## INSTRUCTION EXECUTION DEMONSTRATION
To demonstrate understanding, process this example instruction:
"${config.sampleInstruction}"

Begin instruction following protocol now. Your first instruction is:
${config.firstInstruction}`;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Bot className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            AI Agent Instruction Following Prompt Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Generate structured prompts for AI agents with precise instruction following capabilities
          </p>
        </div>

        <div className="space-y-6">
          <PromptList 
            prompts={examplePrompts} 
            onSelect={(selectedConfig) => setConfig(selectedConfig)} 
          />

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Wand2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Quick Generate</h2>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={exampleInput}
                onChange={(e) => setExampleInput(e.target.value)}
                placeholder="Describe what you want the AI to do, e.g., 'Extract data from JSON'"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <button
                onClick={generateFromExample}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                Generate
              </button>
            </div>
          </div>

          <ConfigSection title="System Parameters">
            <FormField
              label="Agent Name"
              type="text"
              value={config.agentName}
              onChange={(value) => updateConfig('agentName', value)}
              placeholder="e.g., TaskMaster-2000"
            />
            <FormField
              label="API Key"
              type="text"
              value={config.apiKey}
              onChange={(value) => updateConfig('apiKey', value)}
              placeholder="Enter your API key"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Authority Level"
                value={config.authorityLevel}
                onChange={(value) => updateConfig('authorityLevel', value)}
                placeholder="Basic, Intermediate, Advanced, or Administrator"
              />
              <FormField
                label="Execution Context"
                value={config.context}
                onChange={(value) => updateConfig('context', value)}
                placeholder="e.g., Data Analysis Environment"
              />
            </div>
            <FormField
              label="Response Format"
              value={config.responseFormat}
              onChange={(value) => updateConfig('responseFormat', value)}
              placeholder="e.g., JSON, Markdown, Natural Language"
            />
          </ConfigSection>

          <ConfigSection title="Contextual Parameters">
            <FormField
              label="Domain Context"
              type="textarea"
              value={config.domainContext}
              onChange={(value) => updateConfig('domainContext', value)}
              placeholder="Specify domain-specific contextual frameworks"
            />
            <FormField
              label="User Indicators"
              value={config.userIndicators}
              onChange={(value) => updateConfig('userIndicators', value)}
              placeholder="e.g., Explicit preferences, Historical interactions"
            />
          </ConfigSection>

          <ConfigSection title="Execution Parameters">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="High Confidence Threshold"
                type="number"
                value={config.confidenceThresholds.high}
                onChange={(value) => updateConfig('confidenceThresholds', { 
                  ...config.confidenceThresholds, 
                  high: value 
                })}
              />
              <FormField
                label="Mid Confidence Threshold"
                type="number"
                value={config.confidenceThresholds.mid}
                onChange={(value) => updateConfig('confidenceThresholds', { 
                  ...config.confidenceThresholds, 
                  mid: value 
                })}
              />
            </div>
          </ConfigSection>

          <ConfigSection title="Example Instructions">
            <FormField
              label="Sample Instruction"
              type="textarea"
              value={config.sampleInstruction}
              onChange={(value) => updateConfig('sampleInstruction', value)}
              placeholder="Provide a representative instruction"
            />
            <FormField
              label="First Instruction"
              type="textarea"
              value={config.firstInstruction}
              onChange={(value) => updateConfig('firstInstruction', value)}
              placeholder="The first instruction to execute"
            />
          </ConfigSection>

          <div className="flex justify-center pt-6">
            <button
              onClick={() => setConfig(defaultConfig)}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
            >
              Clear Form
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Preview & Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <PreviewModal
          content={generatePrompt()}
          onClose={() => setShowPreview(false)}
          onConfirm={copyToClipboard}
        />
      )}
    </div>
  );
}

export default App;
