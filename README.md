# Instruction Following for AI Agents

<p align="center">
  <img src="https://via.placeholder.com/200" alt="Instruction Following Framework" width="200" height="200">
</p>

<p align="center">
  <em>A comprehensive framework for enabling AI agents to follow complex instructions with precision and adaptability</em>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#algorithm">Algorithm</a> •
  <a href="#prompt-templates">Prompt Templates</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

## Overview

This repository provides a robust framework for instruction following in autonomous agent systems, designed to handle commands ranging from elementary directives to highly complex, multi-step instructions. The algorithm implements hierarchical decomposition structures with probabilistic reasoning capabilities, feedback loops, and contextual awareness mechanisms to ensure accurate instruction interpretation and execution across varying domains.

## Key Features

- **Hierarchical Instruction Decomposition**: Break down complex instructions into manageable, atomic actions
- **Contextual Understanding**: Interpret instructions within appropriate ontological frames
- **Adaptive Execution**: Adjust execution strategies based on feedback and environmental changes
- **Confidence-Based Decision Making**: Quantify certainty in instruction understanding and execution
- **Extensible Framework**: Easily integrate with existing AI systems and extend for domain-specific applications

## Installation

```bash
# Clone the repository
git clone https://github.com/ai-in-pm/Instruction-Following-for-AI-Agents.git

# Navigate to the project directory
cd Instruction-Following-for-AI-Agents

# Install dependencies
pip install -r requirements.txt

# (Optional) Install development dependencies
pip install -r requirements-dev.txt
```

## Usage

### Basic Implementation

```python
from instruction_following import InstructionFollowingSystem

# Initialize the system with your knowledge base and action repository
system = InstructionFollowingSystem(
    knowledge_base=your_knowledge_base,
    action_repository=your_action_repository,
    memory_system=your_memory_system
)

# Process a natural language instruction
result = system.process_instruction(
    "Analyze the customer feedback data from Q1 and generate a summary report highlighting the top three complaint categories"
)

# Access execution results
print(result.summary)
print(result.execution_trace)
```

### Integration with Existing Agents

```python
from your_agent_framework import Agent
from instruction_following import InstructionFollowingModule

class EnhancedAgent(Agent):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Initialize the instruction following module
        self.instruction_module = InstructionFollowingModule(
            knowledge_base=self.knowledge_base,
            action_capabilities=self.action_capabilities
        )
    
    def process_user_input(self, user_input):
        # Use instruction following for command processing
        if self.is_instruction(user_input):
            return self.instruction_module.process(user_input)
        
        # Handle other types of inputs with existing logic
        return super().process_user_input(user_input)
```

## Algorithm

The core instruction following algorithm consists of six primary phases:

1. **Parsing**: Convert natural language instructions into structured representations
2. **Contextualization**: Resolve ambiguities using available context
3. **Decomposition**: Break complex instructions into executable components
4. **Validation**: Verify feasibility of the execution plan
5. **Execution**: Carry out actions with continuous monitoring
6. **Memory Update**: Integrate execution results into knowledge base

The algorithm employs recursive decomposition patterns and probabilistic reasoning to handle uncertainty in instruction interpretation. For detailed implementation, see [algorithm documentation](docs/algorithm.md).

```python
def process_instruction(self, instruction, user_context=None):
    """Master method for processing incoming instructions"""
    # Phase 1: Parse and understand the instruction
    parsed_instruction = self._parse_instruction(instruction)
    
    # Phase 2: Disambiguate and contextualize
    contextualized_instruction = self._contextualize(parsed_instruction, user_context)
    
    # Phase 3: Decompose complex instructions into atomic actions
    action_plan = self._decompose_instruction(contextualized_instruction)
    
    # Phase 4: Validate feasibility of action plan
    if not self._validate_plan(action_plan):
        return self._request_clarification(contextualized_instruction)
    
    # Phase 5: Execute action plan with monitoring
    execution_result = self._execute_with_monitoring(action_plan)
    
    # Phase 6: Update memory and learning systems
    self._update_memory(instruction, action_plan, execution_result)
    
    return execution_result
```

## Prompt Templates

The repository includes a collection of prompt templates designed for various instruction following scenarios. These templates can be customized to adapt the system's behavior for specific applications.

### Basic Template Structure

```markdown
# INSTRUCTION FOLLOWING PROTOCOL v2.1

## SYSTEM PARAMETERS
- Agent Designation: {AGENT_NAME}
- Authority Level: {AUTHORITY_LEVEL}
- Execution Context: {CONTEXT}
- Response Format: {DESIRED_FORMAT}

## INSTRUCTION DECOMPOSITION PROTOCOL
When receiving any instruction, you will:

1. PARSE the instruction into components:
   - Primary Intent: Identify the core objective
   - Entities: Extract all relevant objects, concepts, and targets
   - Constraints: Identify all limitations, rules, and boundaries
   - Parameters: Extract all variables, settings, and configurable elements

# ... (additional sections)

Begin instruction following protocol now. Your first instruction is:
{FIRST_INSTRUCTION}
```

For the complete collection of templates and customization guidelines, see [prompt templates documentation](docs/prompt_templates.md).

## Evaluation

The framework includes comprehensive evaluation metrics and benchmarks for assessing instruction following performance:

- **Accuracy**: Correctness of instruction interpretation
- **Completeness**: Extent to which all aspects of the instruction are addressed
- **Efficiency**: Resource utilization during execution
- **Adaptability**: Performance across varying instruction types and domains

Evaluation results on standard benchmarks are available in the [evaluation report](docs/evaluation.md).

## Application Domains

The instruction following framework has been applied and tested in various domains:

- **Personal Assistant Systems**: Task management and information retrieval
- **Robotic Control**: Translating natural language commands to physical actions
- **Data Analysis**: Executing complex analytical workflows
- **Content Generation**: Following stylistic and structural guidelines
- **Educational Tutoring**: Customizing explanations based on student needs

Case studies and domain-specific adaptations are documented in [application examples](docs/applications.md).

## Contributing

We welcome contributions to enhance the instruction following framework:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Implement your changes with appropriate tests
4. Submit a pull request with a clear description of improvements

Please refer to our [contribution guidelines](CONTRIBUTING.md) for more details.

### Development Setup

```bash
# Set up pre-commit hooks
pip install pre-commit
pre-commit install

# Run tests
pytest

# Run linter
flake8
```

## Roadmap

- [x] Core instruction parsing and execution framework
- [x] Contextual disambiguation system
- [x] Hierarchical decomposition engine
- [ ] Enhanced confidence estimation models
- [ ] Cross-domain transfer learning capabilities
- [ ] Multi-modal instruction interpretation
- [ ] Collaborative instruction following between multiple agents

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Citation

If you use this framework in your research or applications, please cite:

```bibtex
@software{instruction_following_framework,
  author = {AI-in-PM Team},
  title = {Instruction Following for AI Agents},
  url = {https://github.com/ai-in-pm/Instruction-Following-for-AI-Agents},
  year = {2025},
}
```

## Acknowledgements

- This work builds upon research in instruction following, natural language understanding, and autonomous agent systems
- Special thanks to contributors and research partners who provided valuable feedback and testing

---

<p align="center">
  Made with ❤️ by the AI-in-PM Team
</p>
