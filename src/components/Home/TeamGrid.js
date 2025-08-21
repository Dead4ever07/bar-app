import React from "react";
import "../../index.css";
import "./Home.css";
import members from "./Members";
/**
 * TeamGrid Component
 * 
 * Props:
 *  - members: Array<{
 *      name: string;
 *      photo?: string;   // image url
 *      role?: string;    // optional subtitle under the name
 *      href?: string;    // optional link wrapper around the card
 *    }>
 *  - columns?: number    // optional base column count (default 2)
 *
 * Usage:
 *  <TeamGrid members={[{ name: 'Sam', photo: '...' }]} />
 */

export function TeamGrid() {
  return (
    <div className="team-section w3-margin-top-custom" id="members">
      <h2 className="w3-center w3-margin-bottom">Membros</h2>

      <div className="w3-row-padding w3-center">
        {members.map((member, index) => (
          <div key={index} className="w3-col l3 m4 s6 w3-margin-bottom">
            <div className="w3-display-container w3-card w3-round team-card" style={{ overflow: "hidden" }}>
              {/* Member Image */}
              <img
                src={member.photo}
                alt={member.name}
                className="w3-image"
                style={{ width: "100%", height: "auto", display: "block" }}
              />

              {/* Overlay Text */}
              <div className="w3-display-middle w3-container w3-black w3-opacity w3-round-small">
                <h3 className="w3-text-white w3-small w3-margin-0">{member.name}</h3>
                {member.role && (
                  <p className="w3-tiny w3-text-white w3-margin-0">{member.role}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
