"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { MessageCircle, ThumbsUp, Calendar } from "lucide-react";

type Response = {
  author: string;
  text: string;
  score: number;
  created_utc: string;
};

type Discussion = {
  title: string;
  subreddit: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: string;
  selftext: string;
  responses: Response[];
};

const RedditDiscussions: React.FC<{ discussions: Discussion[] }> = ({
  discussions = [],
}) => {
  const [expandedDiscussion, setExpandedDiscussion] = useState<number | null>(
    null
  );

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // If no discussions are provided, show a placeholder
  if (!discussions || discussions.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            No discussions found. Try searching for a different topic.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {discussions.map((discussion, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-start flex-col sm:flex-row gap-4">
              <div>
                <h2 className="text-xl font-bold">{discussion.title}</h2>
                <p className="text-sm text-gray-500">
                  r/{discussion.subreddit} • Posted by u/{discussion.author}
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {discussion.score}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {discussion.num_comments}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(discussion.created_utc)}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {discussion.selftext && (
              <p className="mb-4 text-gray-700 whitespace-pre-line">
                {discussion.selftext}
              </p>
            )}

            {discussion.responses && discussion.responses.length > 0 && (
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() =>
                  setExpandedDiscussion(
                    expandedDiscussion === index ? null : index
                  )
                }
              >
                {expandedDiscussion === index
                  ? "Hide responses"
                  : "Show responses"}
              </button>
            )}

            {expandedDiscussion === index && discussion.responses && (
              <div className="mt-4 space-y-4">
                {discussion.responses.map((response, rIndex) => (
                  <div key={rIndex} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2 flex-col sm:flex-row gap-2">
                      <span className="font-medium">u/{response.author}</span>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {response.score}
                        </span>
                        <span>{formatDate(response.created_utc)}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">
                      {response.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RedditDiscussions;
