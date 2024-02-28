import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Avatar(props) {
  const { animation, wireframe } = props;
  const { headFollow, cursorFollow } = useControls({
    headFollow: false,
    cursorFollow: false,
  });
  const group = useRef();
  const { nodes, materials } = useGLTF("models/alllworking.glb");

  const { animations: typingAnimation } = useFBX("animations/Typing.fbx");
  const { animations: standingAnimation } = useFBX(
    "animations/Standing Idle.fbx"
  );
  const { animations: fallingAnimation } = useFBX(
    "animations/Falling Idle.fbx"
  );

  typingAnimation[0].name = "Typing";
  standingAnimation[0].name = "Standing";
  fallingAnimation[0].name = "Falling";

  const { actions } = useAnimations(
    [typingAnimation[0], standingAnimation[0], fallingAnimation[0]],
    group
  );

  useFrame((state) => {
    if (headFollow) {
      group.current.getObjectByName("Head").lookAt(state.camera.position);
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      group.current.getObjectByName("Spine2").lookAt(target);
    }
  });

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      actions[animation].reset().fadeOut(0.5);
    };
  }, [animation]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [wireframe]);

 return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Root" rotation={[Math.PI / 66, 0, 0]} scale={0.011}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Ch23_Belt" geometry={nodes.Ch23_Belt.geometry} material={materials['Ch23_body.001']} skeleton={nodes.Ch23_Belt.skeleton} />
          <skinnedMesh name="Ch23_Body" geometry={nodes.Ch23_Body.geometry} material={materials['Ch23_body.001']} skeleton={nodes.Ch23_Body.skeleton} />
          <skinnedMesh name="Ch23_Hair001" geometry={nodes.Ch23_Hair001.geometry} material={materials['Ch23_hair.002']} skeleton={nodes.Ch23_Hair001.skeleton} />
          <skinnedMesh name="Ch23_Pants" geometry={nodes.Ch23_Pants.geometry} material={materials['Ch23_body.001']} skeleton={nodes.Ch23_Pants.skeleton} />
          <skinnedMesh name="Ch23_Shirt" geometry={nodes.Ch23_Shirt.geometry} material={materials['Ch23_body.001']} skeleton={nodes.Ch23_Shirt.skeleton} />
          <skinnedMesh name="Ch23_Shoes" geometry={nodes.Ch23_Shoes.geometry} material={materials['Ch23_body.001']} skeleton={nodes.Ch23_Shoes.skeleton} />
          <skinnedMesh name="Ch23_Suit" geometry={nodes.Ch23_Suit.geometry} material={materials['Ch23_body.001']} skeleton={nodes.Ch23_Suit.skeleton} />
        </group>
        <group name="Armature001" position={[0, -0.004, 0.01]} rotation={[Math.PI / 2, 0.001, 0]} scale={0.01} />
      </group>
    </group>
  );
}

useGLTF.preload("models/alllworking.glb");
useFBX.preload("animations/Typing.fbx");
useFBX.preload("animations/Standing Idle.fbx");
useFBX.preload("animations/Falling Idle.fbx");      

