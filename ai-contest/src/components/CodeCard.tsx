import { AlertTriangle, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

interface CodeCardProps {
  codeSug: {
    id: number;
    ticket_id: string;
    commit_id: string | null;
    file_name: string;
    lines: string;
    code_snippet: string;
    issue: string;
    suggestion: string;
    created_at: string;
    reviewed_by: string;
    issue_description: string;
    fixed_code: string;
    priority: string;
  };
}

export function CodeCard({ codeSug }: CodeCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(codeSug.code_snippet);
  };

  const getColor = () => {
    if (codeSug.priority === "high") {
      return "bg-red-50";
    } else if (codeSug.priority === "low") {
      return "bg-yellow-50";
    }
  };

  const getBgColor = () => {
    if (codeSug.priority === "high") {
      return "bg-red-500";
    } else if (codeSug.priority === "low") {
      return "bg-yellow-500";
    }
  };

  return (
    <div className={`rounded-lg p-6 ${getColor()}`}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <div>
            <h2 className="text-lg font-semibold">Security Issue</h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-white text-xs px-2 py-0.5 rounded ${getBgColor()}`}
              >
                {codeSug.priority} priority
              </span>
              <span className="text-gray-500 text-sm">#{codeSug.id}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="font-medium text-red-700">Problem Identified</h3>
          </div>
          <div className="flex items-center justify-center p-3 w-fit bg-yellow-100 rounded-lg border border-yellow-300">
            <p className="text-black font-medium text-sm">{codeSug.issue}</p>
          </div>
        </div>

        <div>
          <div className="bg-[#0A1120] rounded p-4 font-mono text-sm text-white overflow-x-auto">
            <pre>{codeSug.code_snippet}</pre>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <h3 className="font-medium text-green-700">Recommended Solution</h3>
          </div>
          <div className="flex items-center justify-center p-3 w-fit bg-green-100 rounded-lg border border-green-300">
            <p className="text-black font-medium text-sm">
              {codeSug.suggestion}
            </p>
          </div>
        </div>

        <Button variant="outline" className="w-fit">
          <Copy className="w-4 h-4 mr-1" />
          Copy
        </Button>

        <div>
          <div className="bg-[#0A1120] rounded p-4 font-mono text-sm text-white overflow-x-auto">
            <pre>{codeSug.fixed_code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
